# Sağlayıcı (Mod) Akış Adımları ve Detayları

### 1. Kayıt Ol / Giriş Yap
- Açıklama: Sağlayıcı e-posta ve şifre ile kayıt olur veya giriş yapar.
- Ekranlar: /register, /login, /forgot-password
- Endpointler:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/forgot-password
  - POST /api/auth/reset-password

### 2. Profil Oluşturma
- Açıklama: Sağlayıcı, profilini ve uzmanlık alanlarını doldurur.
- Ekranlar: /mod/profile/edit
- Endpointler:
  - GET /api/mod/profile
  - PUT /api/mod/profile

### 3. Hizmet Ekleme
- Açıklama: Sağlayıcı, sunduğu hizmetleri ve fiyatlarını ekler.
- Ekranlar: /mod/services
- Endpointler:
  - POST /api/mod/services
  - GET /api/mod/services

### 4. Randevu Yönetimi
- Açıklama: Sağlayıcı, gelen randevu taleplerini görür ve yönetir.
- Ekranlar: /mod/bookings
- Endpointler:
  - GET /api/mod/bookings
  - PUT /api/mod/bookings/:id

### 5. Mesajlaşma
- Açıklama: Sağlayıcı, kullanıcılarla mesajlaşır.
- Ekranlar: /mod/messages
- Endpointler:
  - GET /api/mod/messages
  - POST /api/mod/messages

### 6. Ödeme Takibi
- Açıklama: Sağlayıcı, aldığı ödemeleri ve bakiye durumunu görür.
- Ekranlar: /mod/payments
- Endpointler:
  - GET /api/mod/payments

### 7. Profil ve Hizmet Onayı
- Açıklama: Profil ve hizmetler admin onayından geçmeden yayına alınmaz.
- Ekranlar: /mod/verification
- Endpointler:
  - GET /api/mod/verification-status 