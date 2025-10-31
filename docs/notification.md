# Bildirim Sistemi (Email/Push) Dokümantasyonu

## Amaç
Kullanıcı ve sağlayıcılara sistem içi bildirim, e-posta ve push notification göndermek.

## Kullanılacak Servisler
- Email: SMTP veya üçüncü parti (SendGrid, Mailgun vs.)
- Push: Firebase Cloud Messaging (FCM) veya Expo Notifications

## Temel Akış
1. Önemli olaylarda (randevu onayı, ödeme, mesaj vb.) bildirim tetiklenir.
2. Kullanıcıya e-posta ve/veya push notification gönderilir.
3. Bildirim geçmişi veritabanında tutulur.

## Örnek Endpointler
- POST /api/notifications/email
- POST /api/notifications/push
- GET /api/notifications/history 