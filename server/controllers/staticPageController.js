const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPage = async (req, res) => {
  try {
    const { key } = req.params;
    const page = await prisma.staticPage.findUnique({ where: { key } });
    if (!page) return res.status(404).json({ message: 'Sayfa bulunamadı.' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { key } = req.params;
    const { title, content } = req.body;
    const page = await prisma.staticPage.upsert({
      where: { key },
      update: { title, content },
      create: { key, title, content }
    });
    res.json({ message: 'Sayfa güncellendi', page });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
}; 