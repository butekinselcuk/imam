# Auth API Endpointleri

## Kayıt Ol
POST /api/auth/register
İstek:
```json
{
  "name": "Ali Veli",
  "email": "ali@mail.com",
  "password": "123456"
}
```
Cevap:
```json
{
  "message": "Kayıt başarılı",
  "user": {
    "id": "uuid",
    "name": "Ali Veli",
    "email": "ali@mail.com"
  }
}
```

## Giriş Yap
POST /api/auth/login
İstek:
```json
{
  "email": "ali@mail.com",
  "password": "123456"
}
```
Cevap:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Ali Veli",
    "email": "ali@mail.com",
    "role": "user"
  }
}
```

## Şifre Sıfırlama
POST /api/auth/forgot-password
İstek:
```json
{
  "email": "ali@mail.com"
}
```
Cevap:
```json
{
  "message": "Şifre sıfırlama e-postası gönderildi."
}
```

POST /api/auth/reset-password
İstek:
```json
{
  "token": "reset_token",
  "newPassword": "yeniSifre123"
}
```
Cevap:
```json
{
  "message": "Şifre başarıyla güncellendi."
}
```

## Kullanıcı Profilini Görüntüle
GET /api/user/profile
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
{
  "id": "uuid",
  "name": "Ali Veli",
  "email": "ali@mail.com",
  "role": "user"
}
```

## Kullanıcı Profilini Güncelle
PUT /api/user/profile
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "name": "Ali Veli 2",
  "email": "ali2@mail.com"
}
```
Cevap:
```json
{
  "message": "Profil güncellendi",
  "user": {
    "id": "uuid",
    "name": "Ali Veli 2",
    "email": "ali2@mail.com"
  }
}
```

## Sağlayıcı (Mod) Profilini Görüntüle
GET /api/mod/profile
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
{
  "id": "provider_uuid",
  "userId": "user_uuid",
  "bio": "Uzman psikolog, 10 yıl deneyim",
  "expertise": "Psikoloji",
  "isVerified": true,
  "user": { "id": "user_uuid", "name": "Ali Veli", "email": "ali@mail.com" },
  "services": [
    {
      "id": "service_uuid",
      "title": "Aile Terapisi",
      "description": "Aile içi iletişim ve çözüm odaklı terapi",
      "price": 600,
      "categoryId": "cat_1",
      "image": "https://cdn.site.com/service1.jpg"
    }
  ]
}
```

## Sağlayıcı (Mod) Profilini Güncelle
PUT /api/mod/profile
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "bio": "Yeni bio",
  "expertise": "Aile Danışmanlığı"
}
```
Cevap:
```json
{
  "message": "Profil güncellendi",
  "provider": { ... }
}
```

## Hizmet Ekle
POST /api/mod/services
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "title": "Online Terapi",
  "description": "1 saat online görüşme",
  "price": 500,
  "categoryId": "cat_uuid"
}
```
Cevap:
```json
{
  "message": "Hizmet eklendi",
  "service": {
    "id": "service_uuid",
    "title": "Online Terapi",
    "description": "1 saat online görüşme",
    "price": 500,
    "categoryId": "cat_uuid",
    "image": "https://cdn.site.com/online-terapi.jpg"
  }
}
```

## Hizmetleri Listele
GET /api/mod/services
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  {
    "id": "service_uuid",
    "title": "Online Terapi",
    "description": "1 saat online görüşme",
    "price": 500,
    "categoryId": "cat_uuid",
    "image": "https://cdn.site.com/online-terapi.jpg"
  }
]
```

## Randevuları Listele
GET /api/mod/bookings
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  {
    "id": "booking_uuid",
    "user": { "id": "user_uuid", "name": "Ali Veli" },
    "service": {
      "id": "service_uuid",
      "title": "Aile Terapisi"
    },
    "status": "pending",
    "date": "2025-07-06T13:03:41.000Z"
  }
]
```

## Randevu Durumu Güncelle
PUT /api/mod/bookings/:id
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "status": "approved"
}
```
Cevap:
```json
{
  "message": "Randevu güncellendi",
  "booking": {
    "id": "booking_uuid",
    "status": "approved",
    "date": "2025-07-06T13:03:41.000Z"
  }
}
```

## Mesaj Gönder
POST /api/messages
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "receiverId": "user_uuid",
  "content": "Merhaba, randevunuz onaylandı."
}
```
Cevap:
```json
{
  "message": "Mesaj gönderildi",
  "data": { ... }
}
```

## Mesajları Listele
GET /api/messages
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "msg_uuid", "senderId": "provider_uuid", "receiverId": "user_uuid", "content": "Merhaba" }
]
```

## Ödeme Oluştur
POST /api/payments
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "bookingId": "booking_uuid",
  "amount": 500
}
```
Cevap:
```json
{
  "message": "Ödeme başarılı",
  "payment": { ... }
}
```

## Ödeme Geçmişi
GET /api/payments/history
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "payment_uuid", "amount": 500, "status": "paid" }
]
```

## Admin Kullanıcıları Listele
GET /api/admin/users
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "user_uuid", "name": "Ali Veli", "email": "ali@mail.com", "role": "user" },
  { "id": "mod_uuid", "name": "Mehmet Sağlayıcı", "email": "mod@demo.com", "role": "mod" }
]
```

## Admin Sağlayıcıları Listele
GET /api/admin/providers
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "provider_uuid", "isVerified": true, "user": { ... } }
]
```

## Admin Kategori Ekle
POST /api/admin/categories
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "name": "Psikoloji",
  "description": "Psikolojik danışmanlık hizmetleri"
}
```
Cevap:
```json
{
  "message": "Kategori eklendi",
  "category": { ... }
}
```

## Admin Raporlar
GET /api/admin/reports
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
{
  "userCount": 10,
  "providerCount": 5,
  "bookingCount": 20,
  "paymentCount": 15
}
```

## Admin Ödemeleri Listele
GET /api/admin/payments
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "payment_uuid", "amount": 500, "status": "paid" }
]
```

## Admin: Sağlayıcı Onayla
PUT /api/admin/providers/:id/verify
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "isVerified": true
}
```
Cevap:
```json
{
  "message": "Sağlayıcı onaylandı",
  "provider": { "id": "provider_uuid", "isVerified": true }
}
```

## Hata Örnekleri
### Kayıtlı Email
```json
{
  "message": "Email zaten kayıtlı."
}
```
### Kullanıcı Bulunamadı
```json
{
  "message": "Kullanıcı bulunamadı."
}
```
### Şifre Hatalı
```json
{
  "message": "Şifre hatalı."
}
```
### Yetkisiz Erişim
```json
{
  "message": "Yetkisiz. Lütfen giriş yapın."
}
```

## Sağlayıcıya Özel Hizmet Ekle
POST /api/providers/services
Header:
```
Authorization: Bearer <jwt_token>
```
İstek:
```json
{
  "categoryId": "kategori_uuid",
  "price": 500,
  "description": "Açıklama",
  "method": "Çevrim içi",
  "target": "Yetişkin"
}
```
Cevap:
```json
{
  "message": "Hizmet eklendi",
  "service": { ... }
}
```

## Sağlayıcıya Eklediği Hizmetleri Listele
GET /api/providers/my-services
Header:
```
Authorization: Bearer <jwt_token>
```
Cevap:
```json
[
  { "id": "ps_uuid", "categoryId": "cat_uuid", "price": 500, ... }
]
``` 