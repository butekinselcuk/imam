# Admin Akış Adımları ve Detayları

### 1. Giriş Yap
- Açıklama: Admin, yönetim paneline giriş yapar.
- Ekranlar: /admin/login
- Endpointler:
  - POST /api/admin/login

### 2. Kullanıcı ve Sağlayıcı Yönetimi
- Açıklama: Tüm kullanıcıları ve sağlayıcıları görüntüler, onaylar veya engeller.
- Ekranlar: /admin/users, /admin/providers
- Endpointler:
  - GET /api/admin/users
  - PUT /api/admin/users/:id
  - GET /api/admin/providers
  - PUT /api/admin/providers/:id

### 3. Kategori ve Hizmet Yönetimi
- Açıklama: Kategorileri ve hizmetleri ekler, düzenler, siler.
- Ekranlar: /admin/categories, /admin/services
- Endpointler:
  - GET /api/admin/categories
  - POST /api/admin/categories
  - PUT /api/admin/categories/:id
  - DELETE /api/admin/categories/:id
  - GET /api/admin/services
  - POST /api/admin/services
  - PUT /api/admin/services/:id
  - DELETE /api/admin/services/:id

### 4. Statik Sayfa Yönetimi
- Açıklama: Hakkımızda, iletişim, ana sayfa, SSS, footer içeriklerini düzenler.
- Ekranlar: /admin/pages
- Endpointler:
  - GET /api/admin/pages
  - PUT /api/admin/pages/:id

### 5. Raporlar ve Analitik
- Açıklama: Sistem kullanımı, randevu, ödeme ve kullanıcı istatistiklerini görüntüler.
- Ekranlar: /admin/reports
- Endpointler:
  - GET /api/admin/reports

### 6. Ödeme ve Finans Yönetimi
- Açıklama: Sağlayıcı ödemelerini ve sistem gelirlerini yönetir.
- Ekranlar: /admin/payments
- Endpointler:
  - GET /api/admin/payments
  - PUT /api/admin/payments/:id

### 7. Bildirim ve Duyuru Yönetimi
- Açıklama: Kullanıcılara ve sağlayıcılara bildirim/duyuru gönderir.
- Ekranlar: /admin/notifications
- Endpointler:
  - POST /api/admin/notifications

# Admin Akışları

- Kategori (hizmet başlığı) ekle, sil, güncelle (web-client/src/pages/AdminCategories.jsx)
- Sağlayıcı başvurularını ve eklediği hizmetleri yönet (server/routes/provider.js, ProviderService)
- Tüm akışlar canlı veriyle ve sade mimariyle çalışır. 