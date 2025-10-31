const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    // Token'ı header'dan al
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Yetkilendirme hatası: Token bulunamadı' });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ error: 'Yetkilendirme hatası: Kullanıcı bulunamadı' });
    }

    // Kullanıcı bilgisini request'e ekle (rolü normalize et)
    user.role = user.role ? String(user.role).toLowerCase() : '';
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware hatası:', error);
    res.status(401).json({ error: 'Yetkilendirme hatası: Geçersiz token' });
  }
};