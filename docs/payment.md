# Ödeme Entegrasyonu Dokümantasyonu

## Amaç
Kullanıcıların randevu ödemelerini güvenli şekilde yapabilmesi.

## Tercih Edilen Servisler
- Stripe (global)
- PayTR veya iyzico (Türkiye)

## Temel Akış
1. Kullanıcı randevu oluşturur, ödeme ekranına yönlendirilir.
2. Ödeme başarılıysa randevu onaylanır.
3. Sağlayıcıya ödeme aktarımı için sistemde bakiye tutulur.

## Teknik Gereksinimler
- 3D Secure desteği
- Webhook ile ödeme durumu takibi
- PCI-DSS uyumluluğu

## Örnek Endpointler
- POST /api/payments
- POST /api/payments/webhook
- GET /api/payments/history 