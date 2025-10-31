# Veritabanı Şeması ve Örnek Veri Modelleri

## Kullanıcı (User)
- id (uuid)
- name
- email
- password
- role (user/mod/admin)
- created_at
- updated_at

## Sağlayıcı (Provider/Mod)
- id (uuid)
- user_id (FK)
- bio
- expertise
- is_verified (bool)
- created_at
- updated_at

## Hizmet (Service)
- id (uuid)
- provider_id (FK)
- title
- description
- price
- category_id (FK)
- created_at
- updated_at

## Kategori (Category)
- id (uuid)
- name
- description

## Randevu (Booking)
- id (uuid)
- user_id (FK)
- provider_id (FK)
- service_id (FK)
- date
- status (pending/approved/declined/completed)
- payment_id (FK)

## Mesaj (Message)
- id (uuid)
- sender_id (FK)
- receiver_id (FK)
- content
- created_at

## Ödeme (Payment)
- id (uuid)
- booking_id (FK)
- amount
- status (pending/paid/failed)
- created_at

## ProviderService (Sağlayıcıya Özel Hizmet)
- id (uuid)
- providerId (FK)
- categoryId (FK)
- price (int)
- description (text)
- method (text, opsiyonel)
- target (text, opsiyonel)
- createdAt
- updatedAt 