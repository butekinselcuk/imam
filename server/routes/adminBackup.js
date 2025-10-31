const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const requireAdmin = require('../middlewares/requireAdmin');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const multer = require('multer');

// Yedek dosyaları için depolama alanı
const backupDir = path.join(__dirname, '../../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, backupDir);
  },
  filename: function (req, file, cb) {
    cb(null, `upload_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Admin yetkisi kontrolü
const checkAdminRole = async (req, res, next) => {
  try {
    const role = (req.user && req.user.role) ? String(req.user.role).toLowerCase() : '';
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için admin yetkisi gereklidir' });
    }
    next();
  } catch (error) {
    console.error('Yetki kontrolü hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Tüm yedekleri listele (dosya sisteminden)
router.get('/', auth, requireAdmin, async (req, res) => {
  try {
    const files = fs.readdirSync(backupDir)
      .filter(f => f.endsWith('.sql'))
      .map(f => {
        const stat = fs.statSync(path.join(backupDir, f));
        return {
          id: f, // dosya adı id olarak kullanılıyor
          name: f,
          size: stat.size,
          createdAt: stat.mtime,
          createdBy: 'system'
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(files);
  } catch (error) {
    console.error('Yedekler listelenirken hata:', error);
    res.status(500).json({ error: 'Yedekler listelenirken bir hata oluştu' });
  }
});

// Yeni yedek oluştur (pg_dump)
// Yardımcı: DATABASE_URL’i güvenli şekilde parse et
const parseDbUrl = (dbUrl) => {
  const u = new URL(dbUrl);
  return {
    dbName: (u.pathname || '').replace(/^\//, ''),
    dbUser: u.username,
    dbPass: u.password || '',
    dbHost: u.hostname,
    dbPort: u.port || '5432',
  };
};
// Yardımcı: PostgreSQL ikili dosya yolunu çözümle
const resolvePgBinary = (name) => {
  const isWin = process.platform === 'win32';
  const exeName = isWin ? `${name}.exe` : name;

  // 1) Spesifik env değişkenleri önceliklidir (PG_DUMP_PATH / PSQL_PATH)
  const specificEnv = process.env[name.toUpperCase() + '_PATH'];
  if (specificEnv && fs.existsSync(specificEnv)) {
    return specificEnv;
  }

  // 2) Ortak bin klasörü (PG_BIN_PATH)
  if (process.env.PG_BIN_PATH) {
    const candidate = path.join(process.env.PG_BIN_PATH, exeName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // 3) PATH üzerinde arama (Windows'ta ';', *nix'te ':')
  const pathSep = isWin ? ';' : ':';
  const sysPath = process.env.PATH || process.env.Path || '';
  for (const dir of sysPath.split(pathSep)) {
    const candidate = path.join(dir.trim(), exeName);
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // 4) Windows için yaygın kurulum dizinleri
  if (isWin) {
    const commonRoots = [
      'C\\\\Program Files\\\\PostgreSQL',
      'C\\\\Program Files (x86)\\\\PostgreSQL',
      'C:'.concat('\\\\PostgreSQL')
    ];
    const versions = ['9.6','10','11','12','13','14','15','16'];
    for (const root of commonRoots) {
      for (const v of versions) {
        const candidate = path.join(root, v, 'bin', exeName);
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
      // Düz kök/bin (bazı taşınabilir kurulumlar)
      const portable = path.join(root, 'bin', exeName);
      if (fs.existsSync(portable)) {
        return portable;
      }
    }
  }

  // 5) Son çare: sistem PATH'e güven
  return name;
}
router.post('/', auth, requireAdmin, async (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup_${timestamp}.sql`;
    const backupPath = path.join(backupDir, backupFileName);

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL tanımlı değil' });
    }

    const { dbName, dbUser, dbPass, dbHost, dbPort } = parseDbUrl(dbUrl);
    if (!dbName || !dbUser || !dbHost) {
      return res.status(500).json({ error: 'DATABASE_URL geçersiz: dbName/user/host eksik' });
    }

    const pgDump = resolvePgBinary('pg_dump');
    const command = `"${pgDump}" -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -f "${backupPath}"`;

    exec(command, { env: { ...process.env, PGPASSWORD: dbPass } }, (error, stdout, stderr) => {
      if (error) {
        const msg = (error.code === 'ENOENT' || /not recognized|spawn/i.test(String(error.message))) ?
          'pg_dump bulunamadı. Lütfen PostgreSQL istemcisini yükleyin veya PG_DUMP_PATH/PG_BIN_PATH ortam değişkenini ayarlayın.' :
          'Veritabanı yedeklenirken bir hata oluştu';
        console.error('Yedekleme hatası:', error);
        return res.status(500).json({ error: msg, details: String(stderr || error.message || '') });
      }

      const stat = fs.statSync(backupPath);
      res.json({
        id: backupFileName,
        name: backupFileName,
        size: stat.size,
        createdAt: new Date(),
        createdBy: req.user?.email || 'admin'
      });
    });
  } catch (error) {
    console.error('Yedekleme hatası:', error);
    res.status(500).json({ error: 'Veritabanı yedeklenirken bir hata oluştu' });
  }
});

// Yedek dosyasını indir
router.get('/:fileName/download', auth, checkAdminRole, async (req, res) => {
  try {
    const { fileName } = req.params;
    const backupPath = path.join(backupDir, fileName);

    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: 'Yedek dosyası bulunamadı' });
    }

    res.download(backupPath, fileName);
  } catch (error) {
    console.error('Yedek indirme hatası:', error);
    res.status(500).json({ error: 'Yedek indirilirken bir hata oluştu' });
  }
});

// Yedekten geri yükle (yüklenen dosyadan)
router.post('/restore', auth, checkAdminRole, upload.single('backup'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Yedek dosyası yüklenemedi' });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL tanımlı değil' });
    }
    const { dbName, dbUser, dbPass, dbHost, dbPort } = parseDbUrl(dbUrl);

    const psql = resolvePgBinary('psql');
    const command = `"${psql}" -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -f "${req.file.path}"`;
    exec(command, { env: { ...process.env, PGPASSWORD: dbPass } }, (error, stdout, stderr) => {
      // fs.unlinkSync(req.file.path);

      if (error) {
        const msg = (error.code === 'ENOENT' || /not recognized|spawn/i.test(String(error.message))) ?
          'psql bulunamadı. Lütfen PostgreSQL istemcisini yükleyin veya PSQL_PATH/PG_BIN_PATH ortam değişkenini ayarlayın.' :
          'Veritabanı geri yüklenirken bir hata oluştu';
        console.error('Geri yükleme hatası:', error);
        return res.status(500).json({ error: msg, details: String(stderr || error.message || '') });
      }

      res.json({ message: 'Veritabanı başarıyla geri yüklendi' });
    });
  } catch (error) {
    console.error('Geri yükleme hatası:', error);
    res.status(500).json({ error: 'Veritabanı geri yüklenirken bir hata oluştu' });
  }
});

// Yedek dosyasını sil
router.delete('/:fileName', auth, checkAdminRole, async (req, res) => {
  try {
    const { fileName } = req.params;
    const backupPath = path.join(backupDir, fileName);

    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: 'Yedek dosyası bulunamadı' });
    }

    fs.unlinkSync(backupPath);
    res.json({ message: 'Yedek dosyası başarıyla silindi' });
  } catch (error) {
    console.error('Dosya silme hatası:', error);
    res.status(500).json({ error: 'Dosya silinirken bir hata oluştu' });
  }
});

module.exports = router;