# Kullanıcı ve Sağlayıcı Akışları

## Kullanıcı (User) Akış Adımları ve Detayları

### 1. Kayıt Ol / Giriş Yap
- Açıklama: Kullanıcı e-posta ve şifre ile kayıt olur veya giriş yapar. Sosyal giriş opsiyonu olabilir.
- Ekranlar: /register, /login, /forgot-password
- Endpointler:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/forgot-password
  - POST /api/auth/reset-password

### 2. Profilini Tamamla (Opsiyonel)
- Açıklama: Kullanıcı profil fotoğrafı, telefon gibi ek bilgileri ekler.
- Ekranlar: /profile/edit
- Endpointler:
  - GET /api/user/profile
  - PUT /api/user/profile

### 3. Hizmet/Kategori Ara
- Açıklama: Kullanıcı ana sayfada hizmet veya kategori araması yapar, filtre uygular.
- Ekranlar: /home, /search
- Endpointler:
  - GET /api/services
  - GET /api/categories

### 4. Sağlayıcı Profili Görüntüle
- Açıklama: Sağlayıcı detaylarını, hizmetlerini ve yorumları görür.
- Ekranlar: /provider/:id
- Endpointler:
  - GET /api/providers/:id

### 5. Randevu Al
- Açıklama: Kullanıcı, sağlayıcıdan uygun saat seçip randevu oluşturur.
- Ekranlar: /provider/:id/booking
- Endpointler:
  - POST /api/bookings

### 6. Mesajlaşma Başlat
- Açıklama: Kullanıcı, sağlayıcı ile mesajlaşma başlatır.
- Ekranlar: /messages
- Endpointler:
  - POST /api/messages
  - GET /api/messages

### 7. Ödeme Yap
- Açıklama: Randevu için ödeme işlemi yapılır.
- Ekranlar: /payment
- Endpointler:
  - POST /api/payments

### 8. Randevu Takibini Görüntüle
- Açıklama: Kullanıcı, geçmiş ve yaklaşan randevularını görür.
- Ekranlar: /my-bookings
- Endpointler:
  - GET /api/bookings

## Kullanıcı olarak kayıt ol
- Profilde sağlayıcı başvurusu yap
- Admin onayından sonra sağlayıcı paneline eriş
- Sağlayıcı panelinde kategori (hizmet başlığı) seç, kendi hizmet detayını ekle (fiyat, açıklama, yöntem, hedef kitle)
- Eklediğin hizmetler anında listelenir 