# Deployment ve CI/CD Dokümantasyonu

## Amaç
Projeyi güvenli ve otomatik şekilde yayına almak.

## Ortamlar
- Geliştirme (development)
- Test (staging)
- Canlı (production)

## Temel Adımlar
1. Kodun repoya push edilmesiyle otomatik testler çalışır.
2. Testler başarılıysa staging ortamına otomatik deploy edilir.
3. Onay sonrası production ortamına geçiş yapılır.

## Kullanılacak Araçlar
- GitHub Actions veya GitLab CI
- Docker
- Vercel/Netlify (frontend), Render/Heroku (backend)

## Örnek Pipeline
- Otomatik test
- Otomatik build
- Otomatik deploy 