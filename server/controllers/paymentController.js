const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount: parseFloat(amount),
        status: 'paid',
        createdAt: new Date()
      }
    });
    res.status(201).json({ message: 'Ödeme başarılı', payment });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { booking: { userId: req.user.userId } },
      include: { booking: true }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
}; 