const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const modRoutes = require('./routes/mod');
const adminRoutes = require('./routes/admin');
const messageRoutes = require('./routes/message');
const paymentRoutes = require('./routes/payment');
const providerRoutes = require('./routes/provider');
const reviewRoutes = require('./routes/review');
const categoryRoutes = require('./routes/category');
const staticPageRoutes = require('./routes/staticPage');
const serviceRoutes = require('./routes/services');
const notificationRoutes = require('./routes/notifications');
const adminLogsRoutes = require('./routes/adminLogs');
const adminBackupRoutes = require('./routes/adminBackup');

const app = express();
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Geliştirme ortamında localhost kaynaklarını serbest bırak
    if (origin.startsWith('http://localhost')) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mod', modRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/static-pages', staticPageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/logs', adminLogsRoutes);
app.use('/api/admin/backups', adminBackupRoutes);

app.get('/', (req, res) => {
  res.send('API çalışıyor');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
