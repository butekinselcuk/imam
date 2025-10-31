# 📌 PROJE: Türkiye için Çok Katmanlı Hizmet Platformu (Web + Mobil Uyumlu)

Bu platform, dini/sosyal/psikolojik danışmanlık hizmetlerini veren uzmanlarla kullanıcıları buluşturan bir sistemdir. 3 farklı kullanıcı statüsü ile çalışır: **Admin**, **Mod (Sağlayıcı)**, **User (Kullanıcı)**. Web tabanlı başlar, ardından Android ve iOS mobil uygulamaları geliştirilecektir.

---

## 💻 KULLANILACAK TEKNOLOJİLER

### 🎯 Genel Yaklaşım:
- **Web First**: Başlangıçta web tabanlı responsive sistem
- **Mobil Next**: Web ile aynı backend'i kullanan mobil uygulama

---

### 🔧 Backend:  
- **Node.js** (Express.js framework)
- **JWT Authentication**  
- **RESTful API** (Tüm sistem modüler ve güvenli)

### 🗂 Frontend:  
- **React.js**  
- **TailwindCSS** (Responsive, modern UI)  
- **React Router / Redux** (Sayfa yönlendirme + global state)  

### 📱 Mobil Uyum:  
- **React Native** (Android + iOS)  
- Ortak backend kullanımı
- **Expo** tercih edilecek (hızlı build)

### 🧠 Veritabanı:  
- **PostgreSQL**  
- ORM olarak **Prisma.js**

### 📁 Dosya Sistemi:
Tüm yapı web/mobil uyumluluk düşünülerek modüler şekilde kurulmalı.

---

## 👥 KULLANICI ROLLERİ

| Rol        | Açıklama                                                                 |
|------------|--------------------------------------------------------------------------|
| `admin`    | Tüm kullanıcıları ve sağlayıcıları yönetir, onaylar, kategori oluşturur. Ayrıca içerik yönetimi (Hakkımızda, İletişim, SSS) yapabilir. |
| `mod`      | Kendi profilini oluşturur, hizmet ekler, rezervasyon alır               |
| `user`     | Hizmet arar, mesaj atar, randevu alır ve ödeme yapar                    |

---

## 🔐 ADMIN CMS YETKİSİ 

Admin, aşağıdaki statik sayfaları admin panelinden düzenleyebilmelidir:

| Sayfa             | Alanlar                            |
|-------------------|-------------------------------------|
| Hakkımızda        | Başlık, içerik, görsel              |
| İletişim          | Adres, telefon, email, harita linki |
| Ana Sayfa         | Banner başlığı, tanım metni, CTA    |
| SSS (FAQ)         | Soru – Cevap listesi                |
| Footer            | Adres, sosyal linkler, tel/email    |


## 🔐 GÜVENLİK
- JWT tabanlı auth
- Role-check middleware her endpointte aktif olmalı
- Sağlayıcılar doğrulama sürecinden geçmeden hizmet sunamaz

---

## 🧱 DİZİN YAPISI (Web + Mobil uyumlu)

## ⚙️ Ortam Değişkenleri
- `DATABASE_URL`: PostgreSQL bağlantı adresi (örn: `postgresql://postgres:password@localhost:5432/imam`)
- `JWT_SECRET`: Token imzalama anahtarı
- `PORT`: Backend portu (varsayılan `5000`)
- `CLIENT_URL`: Web istemci adresi (örn: `http://localhost:3000`)
- `PG_BIN_PATH`: PostgreSQL bin klasörü (örn: `C:\\Program Files\\PostgreSQL\\17\\bin`)
- `PG_DUMP_PATH` (opsiyonel): `pg_dump` tam yol
- `PSQL_PATH` (opsiyonel): `psql` tam yol

## 🚀 Kurulum ve Çalıştırma (Hızlı Başlangıç)
- Sunucu
  - `cd f:\\imam\\server`
  - `npm install`
  - `npm start`
- Web İstemci
  - `cd f:\\imam\\web-client`
  - `npm install`
  - `npm start` (port 3000 doluysa `set PORT=3001 && npm start`)
- `.env` örneği
  - `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/imam"`
  - `JWT_SECRET="super-secret"`
  - `PORT=5000`
  - `CLIENT_URL="http://localhost:3000"`
  - `PG_BIN_PATH="C:\\Program Files\\PostgreSQL\\17\\bin"`

## 🧪 Doğrulama Testleri
- Servis Detayı API: `Invoke-WebRequest -Uri "http://localhost:5000/api/services/<SERVICE_ID>" -UseBasicParsing`
- Yedekleme testi: `cd f:\\imam\\server\\scripts; ./test_backup.ps1`
- Admin Backup UI: `http://localhost:3000/admin/backup` (veya `http://localhost:3001/admin/backup`)

## 🐞 Sorun Giderme
- Servis detay boş/500 hatası:
  - `server/routes/services.js` içindeki `include` alanını `providerServices` → `providerService` olarak düzeltildi.
- `pg_dump` bulunamadı:
  - `.env` içine `PG_BIN_PATH` eklendi; gerekirse `PG_DUMP_PATH`/`PSQL_PATH` tanımlayın.
- CORS `ERR_FAILED`:
  - `server/server.js` içinde `cors` yapılandırması `http://localhost:3000` ve `http://localhost:3001` için genişletildi.
- Port çakışması:
  - Frontend’i `3001` portunda çalıştırın: `set PORT=3001 && npm start`.

## 📜 Değişiklik Günlüğü (2025-10-29)
- ServiceDetail boş sayfa hatası giderildi; backend `include` alanı şema ile uyumlu hale getirildi.
- CORS izinleri geliştirme ortamında localhost kaynaklarını güvenli biçimde kabul edecek şekilde güncellendi.
- Yedekleme akışı için `.env`e `PG_BIN_PATH` eklendi; test scriptiyle doğrulandı.
- Notifications rotası UUID uyumlu hale getirildi (parseInt kaldırıldı).
- ServiceDetail UI zenginleştirildi: `providerService` bilgileri, sağlayıcı kartı ve "Şimdi Rezervasyon Yap" CTA eklendi.

### ✅ Doğrulama (ServiceDetail)
- `npm start` ile backend (`5000`) ve frontend (`3001`) çalışıyor olmalı.
- `/services` → herhangi bir servisin kartındaki "Detaylar" tıklanır.
- `/service/:id` sayfasında:
  - Başlık, açıklama, fiyat ve kategori görünüyor.
  - "Bu hizmeti sunan sağlayıcı" blokunda yöntem, hedef kitle ve fiyat görünüyor.
  - Sağlayıcı kartında profil linki ve "Şimdi Rezervasyon Yap" butonu görünüyor.
- Sağlayıcı linki `/providers/:id` sayfasına yönlendirir.

### 🎨 Profesyonel UI İyileştirmeleri (ServiceDetail)
- Üstte görsel/renk alanı için modern hero banner ve soft gradient eklendi.
- Net hiyerarşi: başlık, kategori yongası, fiyat rozeti (TRY formatı).
- İçerik iki sütun: yöntem/targetAudience/fiyat ve sağlayıcı kartı.
- Birincil CTA: "Şimdi Rezervasyon Yap"; ikincil: "Sağlayıcıya Mesaj Gönder".
- Breadcrumb ile sayfa bağlamı ve geri dönüş deneyimi iyileştirildi.

### ✅ Doğrulama (Profesyonel Görünüm)
- Frontend: `set PORT=3001 && npm start` ile çalışıyor olmalı.
- `/service/:id` sayfası açıldığında:
  - Hero banner (görsel veya renk) ve üstte fiyat rozetini görürsünüz.
  - Kategori yongası ve başlık okunaklı ve kontrastlıdır.
  - Sağlayıcı bloğu iki kart halinde düzgün hizalanır; mobilde tek sütuna düşer.
  - Birincil ve ikincil CTA butonları belirgin ve erişilebilir.
- Fiyatlar `Intl.NumberFormat('tr-TR', 'TRY')` ile biçimlenir.

### 🔧 Teknik Notlar
- Kod: `web-client/src/pages/ServiceDetail.jsx` içinde `formatPrice()` eklendi, markup yeniden düzenlendi.
- Backend veri modeli değişmedi; `providerService.provider` altında isim/ünvanı istiyorsanız ileride `user` ilişkisini include edebiliriz.

## 📍 Yol Haritası
- ServiceDetail sayfasına sağlayıcı ve `providerService` bilgilerini görsel bloklarla ekleme.
- Basit rezervasyon akışını ServiceDetail’den başlatma.
- Bildirimler için okundu/okunmadı filtreleri ve toplu işlemler.
- API ve UI için birim/entegrasyon testleri.
- İsteğe bağlı Docker Compose ile hızlı kurulum.

/project-root
│
├── /server # Backend (Node.js + Express + Prisma)
│ ├── /controllers # Tüm API kontrolcüleri
│ │   ├── adminController.js # Admin işlemleri
│ │   ├── authController.js # Kimlik doğrulama işlemleri
│ │   ├── messageController.js # Mesajlaşma işlemleri
│ │   ├── modController.js # Mod (Sağlayıcı) işlemleri
│ │   ├── paymentController.js # Ödeme işlemleri
│ │   ├── staticPageController.js # Statik sayfa işlemleri
│ │   └── userController.js # Kullanıcı işlemleri
│ │
│ ├── /middleware # Ara yazılımlar
│ │   └── auth.js # Kimlik doğrulama ara yazılımı
│ │
│ ├── /routes # API rotaları
│ │   ├── admin.js # Admin rotaları
│ │   ├── auth.js # Kimlik doğrulama rotaları
│ │   ├── category.js # Kategori rotaları
│ │   ├── message.js # Mesajlaşma rotaları
│ │   ├── mod.js # Mod (Sağlayıcı) rotaları
│ │   ├── notifications.js # Bildirim rotaları
│ │   ├── payment.js # Ödeme rotaları
│ │   ├── provider.js # Sağlayıcı rotaları
│ │   ├── review.js # Yorum rotaları
│ │   ├── services.js # Hizmet rotaları
│ │   ├── staticPage.js # Statik sayfa rotaları
│ │   └── user.js # Kullanıcı rotaları
│ │
│ ├── /utils # Yardımcı fonksiyonlar
│ └── server.js # Ana sunucu dosyası
│
├── /web-client # Web arayüzü (React.js + TailwindCSS)
│ ├── /public # Statik dosyalar
│ ├── /src
│ │   ├── /components # Yeniden kullanılabilir bileşenler
│ │   ├── /context # React context'leri
│ │   ├── /hooks # Özel React hook'ları
│ │   ├── /pages # Sayfa bileşenleri
│ │   ├── App.js # Ana uygulama bileşeni
│ │   └── index.js # Giriş noktası
│ ├── package.json # Bağımlılıklar ve scriptler
│ └── tailwind.config.js # TailwindCSS yapılandırması
│
├── /prisma # Veritabanı şemaları ve migration'lar
│ ├── /migrations # Veritabanı migration'ları
│ ├── schema.prisma # Veritabanı şeması
│ └── seed.js # Örnek veri oluşturma scripti
│
├── /docs # Proje dökümanları
│ ├── admin-flow.md # Admin akış dokümantasyonu
│ ├── api-endpoints.md # API endpoint'leri dokümantasyonu
│ ├── db-schema.md # Veritabanı şema dokümantasyonu
│ ├── deployment.md # Dağıtım dokümantasyonu
│ ├── mobile-flow.md # Mobil akış dokümantasyonu
│ ├── mod-flow.md # Mod akış dokümantasyonu
│ ├── mod-verification.md # Mod doğrulama dokümantasyonu
│ ├── notification.md # Bildirim sistemi dokümantasyonu
│ ├── payment.md # Ödeme sistemi dokümantasyonu
│ ├── test-strategy.md # Test stratejisi dokümantasyonu
│ └── user-flow.md # Kullanıcı akış dokümantasyonu
│
├── /uploads # Yüklenen dosyalar
├── /generated # Otomatik oluşturulan dosyalar
├── package.json # Ana proje bağımlılıkları ve scriptleri
└── .env # Ortam değişkenleri


## 🧠 VERİTABANI ŞEMASI

Projede PostgreSQL veritabanı ve Prisma ORM kullanılmaktadır. Ana veri modelleri:

### 👤 User (Kullanıcı)
- Tüm kullanıcı türleri için temel model (admin, mod, user)
- Kimlik doğrulama ve profil bilgileri
- Rol tabanlı yetkilendirme

### 👨‍💼 Provider (Sağlayıcı)
- Hizmet sağlayıcılar için detaylı profil
- Uzmanlık alanları, fiyatlandırma, konum bilgileri
- Doğrulama durumu ve hizmet yılı

### 🛎️ Service (Hizmet)
- Standart hizmet kategorileri
- Fiyat, açıklama ve görsel bilgileri
- Kategori ilişkisi

### 📋 ProviderService (Sağlayıcı Hizmeti)
- Sağlayıcıların özelleştirilmiş hizmetleri
- Özel fiyatlandırma ve açıklamalar
- Hedef kitle ve yöntem bilgileri

### 📅 Booking (Rezervasyon)
- Kullanıcı ve sağlayıcı arasındaki randevular
- Tarih, durum ve ödeme bilgileri
- Hizmet referansı

### 💬 Message (Mesaj)
- Kullanıcılar arası mesajlaşma
- Gönderen ve alıcı bilgileri
- İçerik ve zaman damgası

### 💰 Payment (Ödeme)
- Rezervasyonlara bağlı ödeme kayıtları
- Tutar ve durum bilgileri
- Sağlayıcı referansı

### 📝 Review (Yorum)
- Kullanıcı değerlendirmeleri
- Puan ve yorum içeriği
- Onay durumu

### 🔔 Notification (Bildirim)
- Sistem bildirimleri
- Okunma durumu
- Kullanıcı veya sağlayıcı hedefi

### ⚙️ SiteSettings (Site Ayarları)
- SEO ayarları
- Logo ve favicon URL'leri
- Site başlığı ve footer metni

## 📱 SAYFA VE İŞLEVLERİ

### 🏠 Kullanıcı Sayfaları
- **Ana Sayfa**: Popüler hizmetler ve sağlayıcılar, müşteri yorumları
- **Hizmetler**: Tüm hizmetleri kategorilere göre filtreleme ve görüntüleme
- **Sağlayıcılar**: Tüm sağlayıcıları filtreleme ve görüntüleme
- **Sağlayıcı Detay**: Sağlayıcı profili, hizmetleri, yorumları ve rezervasyon
- **Hizmet Detay**: Hizmet bilgileri, fiyat ve rezervasyon
- **Kullanıcı Profili**: Kişisel bilgiler, rezervasyonlar ve yorumlar
- **Mesajlar**: Sağlayıcılarla mesajlaşma
- **Rezervasyonlar**: Randevu geçmişi ve durumları

### 👨‍💼 Sağlayıcı Sayfaları
- **Sağlayıcı Paneli**: Profil yönetimi, hizmet ekleme/düzenleme
- **Rezervasyon Yönetimi**: Gelen randevuları onaylama/reddetme
- **Mesaj Kutusu**: Kullanıcılarla iletişim
- **Yorumlar**: Alınan yorumları görüntüleme
- **Ödemeler**: Ödeme geçmişi ve bakiye

### 👑 Admin Sayfaları
- **Dashboard**: Genel istatistikler ve özet bilgiler
- **Kullanıcı Yönetimi**: Tüm kullanıcıları listeleme ve düzenleme
- **Sağlayıcı Yönetimi**: Sağlayıcı onaylama ve düzenleme
- **Kategori Yönetimi**: Hizmet kategorilerini ekleme/düzenleme
- **Yorum Yönetimi**: Yorumları onaylama/reddetme
- **Statik Sayfa Yönetimi**: Hakkımızda, İletişim gibi sayfaları düzenleme
## 🚧 EKSİKLER VE YAPILACAKLAR

### 🔄 Tamamlanması Gereken Özellikler
- **Mobil Uygulama**: React Native ile mobil uygulama henüz geliştirilmemiş
- **Ödeme Entegrasyonu**: Ödeme sistemi altyapısı hazır ancak gerçek ödeme sağlayıcısı entegrasyonu eksik
- **Bildirim Sistemi**: Email ve push notification entegrasyonu tamamlanmalı
- **Sağlayıcı Doğrulama**: Sağlayıcı doğrulama süreci için admin panelinde detaylı onay akışı
- **Rezervasyon Takvimi**: Sağlayıcılar için görsel takvim arayüzü

### 🛠️ Teknik İyileştirmeler
- **Nodemon Kurulumu**: Backend geliştirme için hot-reload özelliği eklenmeli
- **Test Kapsamı**: Birim ve entegrasyon testleri yazılmalı
- **Hata Yönetimi**: Global hata yakalama ve loglama sistemi geliştirilmeli
- **Performans Optimizasyonu**: Frontend için lazy loading ve code splitting
- **Güvenlik Taraması**: Güvenlik açıkları için kod taraması yapılmalı

### 📋 Kurulum ve Çalıştırma Talimatları
1. Projeyi klonlayın: `git clone [repo-url]`
2. Bağımlılıkları yükleyin: `npm install`
3. PostgreSQL veritabanını kurun ve `.env` dosyasındaki bağlantı bilgilerini güncelleyin
4. Veritabanı şemasını oluşturun: `npx prisma migrate dev`
5. Örnek verileri yükleyin: `npm run seed`
6. Backend sunucusunu başlatın: `npm start`
7. Frontend uygulamasını başlatın: `cd web-client && npm start`
- Sağlayıcı (mod) akış adımları ve detayları docs/mod-flow.md dosyasına eklendi
- Admin akış adımları ve detayları docs/admin-flow.md dosyasına eklendi
- Veritabanı şeması ve örnek veri modelleri docs/db-schema.md dosyasına eklendi
- Sağlayıcı doğrulama süreci ve akış diyagramı docs/mod-verification.md dosyasına eklendi
- Bildirim sistemi teknik dokümantasyonu docs/notification.md dosyasına eklendi
- Ödeme entegrasyonu teknik dokümantasyonu docs/payment.md dosyasına eklendi
- Test stratejisi ve örnek senaryolar docs/test-strategy.md dosyasına eklendi
- Deployment ve CI/CD dokümantasyonu docs/deployment.md dosyasına eklendi
- Mobil uygulama akışları ve gereksinimleri docs/mobile-flow.md dosyasına eklendi
- Backend/server klasör yapısı ve temel dosyalar oluşturuldu
- Prisma veri modelleri eklendi, migration tamamlandı ve veritabanı hazırlandı
- Backend ana fonksiyonlarının tamamı (auth, kullanıcı, sağlayıcı, admin, hizmet, randevu, mesaj, ödeme) tamamlandı
- Backend API dokümantasyonu ve örnek istek/cevaplar tamamlandı (docs/api-endpoints.md)
- Frontend (web-client) klasörü, React ve Tailwind kurulumu, temel klasör yapısı oluşturuldu
- Frontend ana sayfa, login, register, navbar, responsive ve modern tasarım tamamlandı
- Frontend ana sayfa ve kartlar şu an örnek verilerle başlatıldı, ileride canlı veriye entegre edilecek
- Hakkımızda, Hizmetler, İletişim gibi temel sayfalar oluşturuldu ve Navbar menüsüne eklendi
- Navbar menüsü modern ve eksiksiz şekilde güncellendi
- Frontend ana sayfa kartları (servisler ve sağlayıcılar) API'den canlı veri çekecek şekilde güncellendi
- useFetch custom hook'u ile veri çekme işlemleri modüler hale getirildi
- Sağlayıcı detay sayfası (ProviderDetail) eklendi ve canlı veriyle entegre edildi
- Sağlayıcı kartları ve detay sayfası API'den gelen canlı veriye uygun şekilde güncellendi, eksik alanlar için varsayılan değerler eklendi
- Müşteri yorumları bölümü de API'den canlı veriyle entegre edildi
- Popüler servisler (Service) görsel ve renk desteğiyle canlı veriyle eksiksiz gösterilecek şekilde tamamlandı
- Mobil uyum ve responsive tasarım iyileştirmeleri tamamlandı (navbar, ana sayfa, kartlar)
- Modern mobil ve masaüstü UI iyileştirmeleri (hamburger menü, overlay, kartlar, butonlar, animasyonlar) tamamlandı
- Hizmet detay sayfası (ServiceDetail) ve ilgili backend endpointi eklendi
- Hizmetler sayfasına kategoriye göre filtreleme özelliği eklendi
- Kullanıcı paneli (profil ve randevu yönetimi) eklendi
- Admin paneli: Yorum yönetimi (canlı veriyle onaylama) eklendi (web-client/src/pages/AdminReviews.jsx)
- Admin paneli: Kategori (hizmet başlığı) yönetimi sadeleştirildi (web-client/src/pages/AdminCategories.jsx)
- Sağlayıcı paneli: Kategori seçip kendi hizmet detayını ekleme (web-client/src/pages/ProviderPanel.jsx)
- Sağlayıcıya özel hizmetler için ProviderService modeli eklendi (prisma/schema.prisma)
- Sağlayıcıya özel hizmet ekleme ve listeleme endpointleri eklendi (server/routes/provider.js)
- Hizmetler (Services.jsx) sayfasında state çakışma hatası giderildi, filtreleme ve kartlar canlı veriyle eksiksiz çalışıyor, test edildi
- Sağlayıcı kartları ve detay sayfası (ProviderDetail) canlı veriyle, fiyat, yöntem, hedef kitle ve görsel dahil eksiksiz ve ayrıntılı gösteriliyor.
- Sağlayıcı detayında her hizmet için "Şimdi Rezervasyon Yap" butonu eklendi (şimdilik alert ile çalışıyor).
- Kullanıcı panelinde randevu geçmişi için tarih, durum ve hizmet adına göre filtreleme özelliği eklendi.
- Sağlayıcı panelinde randevu geçmişi için tarih, durum ve hizmet adına göre filtreleme özelliği eklendi.
- Bildirim ikonunda ve listesinde okundu/okunmadı görseli ve UX iyileştirmesi eklendi.
- Bildirim ikonunda okunmamış bildirim varsa animasyonlu nokta ve listede belirginlik çalışıyor mu?
- Admin panelinde yorum yönetimi ekranına filtreleme ve arama özelliği eklendi.
- Admin panelinde yorum yönetimi ekranında filtreleme ve arama çalışıyor mu?
- Sağlayıcıya/hizmete özel canlı yorumlar için dinamik endpoint (SQL) eklendi: /api/reviews?providerId=...&serviceId=...
- Sağlayıcı/hizmet detayında canlı yorumlar ve puanlar doğru geliyor mu?
- Ana sayfa müşteri yorumları bölümü artık canlı SQL verisiyle, puan ve hizmet başlığıyla gösteriliyor.
- Kullanıcı profilinde 'Yorumlarım' sekmesi ve filtreleme eklendi.
- Kullanıcı profilinde 'Yorumlarım' sekmesi ve filtreleme çalışıyor mu?
- Sağlayıcı detayında yorumlar için filtre ve sıralama (puan, tarih, anahtar kelime) eklendi.
- Sağlayıcı detayında yorumlar için filtre ve sıralama (puan, tarih, anahtar kelime) çalışıyor mu?
- Canlı puanlama ve yorum ekleme (kullanıcıdan, admin onayına düşen) akışı eklendi.
- Kullanıcı canlı olarak puanlama ve yorum ekleyebiliyor mu? Yorum admin onayına düşüyor mu?
- Yorum/Puan verme sadece onaylı/tamamlanmış rezervasyonu olan kullanıcıya açıldı. Manipülasyon engellendi.
- Yorum/Puan verme sadece onaylı/tamamlanmış rezervasyonu olan kullanıcıya açık mı? Diğerleri yorum yapamıyor mu?

Herhangi bir hata veya eksik veri görürsen bana bildir!

---

## 🔒 Güvenlik ve CORS Politikası
- JWT Secret: `.env` içinde güçlü ve uzun bir `JWT_SECRET` kullanın; üretimde sırları paylaşmayın.
- CORS: Geliştirmede `http://localhost:3000` ve `http://localhost:3001` açık; üretimde sadece domainleriniz.
- Token Saklama: Tarayıcıda localStorage yerine prod ortamında HTTP-only cookie önerilir.
- Rate Limit / Bruteforce: Üretimde IP tabanlı rate limit ve login throttling ekleyin.
- Yedek Dosyaları: `backups/` klasörünü repo dışında tutun ve erişim kontrolü uygulayın.
- Çevresel Değişkenler: `.env` dosyasını versiyon kontrolüne dahil etmeyin; `.env.example` kullanın.

### CORS Konfigürasyon Notu
- Backend’de `cors` yapılandırması `server/server.js` içinde tanımlıdır. Geliştirmede localhost kaynakları kabul edilir.
- Prod’da `origin` alanını sadece izinli domainlerle sınırlayın.

## 💾 Yedekleme ve Geri Yükleme

### Yedekleme (pg_dump)
- Admin paneli üzerinden veya komutla alınır; varsayılan klasör: `backups/`.
- Windows için `.env` örneği:
  - `PG_BIN_PATH="C:\\Program Files\\PostgreSQL\\17\\bin"`
  - veya spesifik: `PG_DUMP_PATH` ve `PSQL_PATH`
- Komutlar:
  - Backend API: `GET /api/admin/backup` (admin yetkisi)
  - Script: `server/scripts/test_backup.ps1`

### Geri Yükleme (psql)
- Tüm kullanıcılar için basit SQL dosyası:
  - `psql -U <user> -h <host> -d <dbname> -f backups/<dosya>.sql`
- Windows/PowerShell örneği:
  - `$env:PG_BIN_PATH="C:\\Program Files\\PostgreSQL\\17\\bin"`
  - `& "$env:PG_BIN_PATH\\psql.exe" -U postgres -h localhost -d imam -f backups\backup_YYYY-MM-DD.sql`
- Notlar:
  - Üretimde geri yükleme öncesi bakım modu/servis durdurma önerilir.
  - Büyük dosyalarda `psql` için `-v ON_ERROR_STOP=1` kullanın.

## 🚀 Dağıtım ve Docker Compose Önerileri

### Üretim Ortamı Kontrol Listesi
- Ortam: `NODE_ENV=production` ve sağlam `.env` sırları (JWT, DB bağlantısı).
- CORS: Üretimde sadece izinli domain(ler) için `origin`.
- Günlükleme: Dosya + konsol; kritik hatalar için alarm (Sentry/ELK öneri).
- Sağlık Kontrolü: `GET /health` gibi basit bir endpoint ile canlılık kontrolü.
- Ters Proxy: Nginx/Traefik ile TLS (Let’s Encrypt) ve gzip/HTTP2 aktif.

### Backend (server) Prod Örnek
- Varsayılan port: `5000`
- Örnek `.env`:
  - `PORT=5000`
  - `DATABASE_URL=postgres://<user>:<pass>@<host>:5432/imam`
  - `JWT_SECRET=<uzun_ve_guclu_deger>`
  - `CORS_ORIGIN=https://example.com`

### Frontend (web-client) Prod Örnek
- Derleme: `npm run build` ve statik dosyaları Nginx ile servis edin.
- API tabanı: kodda sabit `http://localhost:5000` kullanımı var; üretimde ters proxy ile `/api` yönlendirmesi önerilir.
- Çevresel değişken: ileride `REACT_APP_API_URL` veya `VITE_API_URL` ile yapılandırma önerilir.

### Örnek Docker Compose (Konsept)
- Aşağıdaki örnek, `server` ve `web-client` dizinlerinde uygun Dockerfile bulunduğunu varsayar.

```yaml
version: "3.9"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: imam
      POSTGRES_PASSWORD: changeme
      POSTGRES_DB: imam
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  server:
    build: ./server
    environment:
      DATABASE_URL: postgres://imam:changeme@db:5432/imam
      JWT_SECRET: supersecret
      CORS_ORIGIN: https://example.com
      NODE_ENV: production
    depends_on:
      - db
    ports:
      - "5000:5000"

  web:
    build: ./web-client
    depends_on:
      - server
    ports:
      - "3000:80"  # Nginx ile statik build servis edildiğini varsayar

volumes:
  db-data:
```

### Çalıştırma
- Komut: `docker compose up -d --build`
- Loglar: `docker compose logs -f server` ve `docker compose logs -f web`
- Sağlık kontrolü: `curl http://localhost:5000/health`

### Ters Proxy Önerisi (Nginx)
- `/api` isteklerini `server:5000`’a yönlendirip, statik dosyaları `web` servisinden verin.
- HTTP→HTTPS yönlendirmesi, gzip ve cache header’ları aktif edin.

## 📋 Durum Takibi
- Tamamlandı: Sistem Gereksinimleri ve Sürüm Uyumları
- Tamamlandı: Güvenlik ve CORS Politikası
- Tamamlandı: Yedekleme ve Geri Yükleme
- Tamamlandı: Dağıtım ve Docker Compose Önerileri
- Tamamlandı: Frontend API URL yapılandırması (REACT_APP_API_URL) ve merkezî axios istemcisi
- Tamamlandı: ServiceDetail ve Services refaktörü (merkezî API istemcisi)
- Tamamlandı: Navbar ve Notifications refaktörü (merkezî API istemcisi)
- Tamamlandı: AdminLogs ve Login refaktörü (merkezî API istemcisi)
- Tamamlandı: AdminBackup refaktörü (merkezî API istemcisi)
- Tamamlandı: README’ye Logging/İzleme, Test Stratejisi, API Sözleşmesi ve CI/CD bölümleri
- Devam Ediyor: Logging/İzleme pratiklerinin prod entegrasyonu (Sentry/ELK)
- Planlandı: Kalan sayfalarda merkezî API istemcisine geçiş (varsa)
- Planlandı: Test kapsamı artırımı ve otomasyon
- Planlandı: OpenAPI sözleşmesi ve otomatik doğrulama

## 🪵 Logging ve İzleme (Öneriler)
- Log Seviyeleri: `error`, `warning`, `info`, `debug` (server tarafında ayırın).
- Toplama: ELK Stack (Elasticsearch, Logstash, Kibana) veya OpenSearch.
- Hata İzleme: Sentry ile hata raporlama ve performans izleme.
- Yapılandırma: Üretimde JSON log formatı, request-id ve kullanıcı-id ekleyin.
- Altyapı: Nginx access logları ve backend uygulama loglarını merkezi sistemde toplayın.

## 🧪 Test Stratejisi Özeti
- Birim Test: Controller ve yardımcı fonksiyonlar için.
- Entegrasyon Testi: Auth ve rezervasyon akışları.
- UI Testi: Kritik bileşenler için React Testing Library.
- Belge: Ayrıntılar için `docs/test-strategy.md`.

## 📜 API Sözleşmesi Özeti
- Çekirdek: `Auth`, `User`, `Provider`, `Service`, `Booking`, `Notification`, `Admin`.
- Örnekler: `GET /api/services`, `GET /api/services/:id`, `POST /api/auth/login`.
- Belge: Ayrıntılar için `docs/api-endpoints.md`.
- Gelecek: OpenAPI şeması eklenip CI’de sözleşme doğrulaması.

## ⚙️ CI/CD (GitHub Actions)
- Yol: `.github/workflows/ci.yml`
- Tetikleyiciler: `push`, `pull_request` (main/master)
- Adımlar:
  - Node 20 kurulumu ve npm cache
  - `server/` için `npm ci` ve `npm test --if-present`
  - `web-client/` için `npm ci`, `npm run build --if-present`, `npm run lint --if-present`
- Sonraki adım: Deploy job (Docker build ve push, üretim sunucuya rollout)

