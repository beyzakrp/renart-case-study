# Renart - Mücevher Koleksiyonu

Bu proje, Renart'ın premium mücevher koleksiyonunu sergileyen modern bir web uygulamasıdır. Next.js 15 ile geliştirilmiş olup, gerçek zamanlı altın fiyatları ile dinamik ürün fiyatlandırması sunar.

## 🌟 Özellikler

### Tasarım ve UI
- ✨ **Pixel-Perfect Tasarım**: Verilen tasarıma sadık, modern ve zarif arayüz
- 🎨 **Özel Font Entegrasyonu**: Avenir (Book & Medium) ve Montserrat (Regular, Medium, SemiBold) fontları
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 🎯 **Renk Seçici**: Her ürün için 3 farklı altın rengi (Sarı, Beyaz, Rose)
- ⭐ **Yıldız Puanlama**: 5 üzerinden dinamik puanlama sistemi

### Ürün Carousel
- ⬅️➡️ **Ok Tuşları ile Navigasyon**: Sol/sağ ok tuşları ile gezinme
- 👆 **Swipe Desteği**: Mobil ve masaüstünde kaydırma desteği
- 🎯 **Dots Navigation**: Sayfa göstergesi ve hızlı geçiş
- 📊 **Progress Bar**: İlerleme çubuğu
- ⌨️ **Klavye Desteği**: Klavye ok tuşları ile kontrol

### API ve Backend
- 💰 **Gerçek Zamanlı Altın Fiyatları**: Metals API entegrasyonu
- 🧮 **Dinamik Fiyat Hesaplama**: (popularityScore + 1) × weight × goldPrice
- 🔍 **Gelişmiş Filtreleme**: Fiyat aralığı ve popülerlik skoru filtreleri
- ⚡ **Performanslı Cache**: 5 dakika cache süresi
- 🛡️ **Hata Yönetimi**: Kapsamlı hata kontrolü ve fallback mekanizmaları

### Bonus Özellikler
- 🎛️ **İnteraktif Filtreler**: Minimum/maksimum fiyat ve popülerlik filtreleri
- 🔄 **Canlı Filtreleme**: Gerçek zamanlı sonuç güncelleme
- 📈 **Sayaç Gösterimi**: Toplam ürün sayısı
- 🧹 **Filtre Temizleme**: Tek tıkla tüm filtreleri sıfırlama

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar
1. **Repository'yi klonlayın:**
   ```bash
   git clone <repository-url>
   cd renart-case-study
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın:**
   ```
   http://localhost:3000
   ```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── layout.tsx           # Ana layout (Avenir header)
│   ├── page.tsx             # Ana sayfa
│   └── api/
│       └── products/
│           └── route.ts     # Ürünler API endpoint
├── components/
│   ├── ProductCard.tsx      # Ürün kartları
│   └── ProductCarousel.tsx  # Carousel komponenti
├── styles/
│   └── globals.css          # Font tanımları ve custom CSS
└── products.json            # Ürün verileri

public/
└── fonts/                   # Avenir & Montserrat fontları
```

## 🎯 API Endpoints

### GET /api/products
Tüm ürünleri gerçek zamanlı fiyatlarla döndürür.

**Query Parametreleri:**
- `minPrice`: Minimum fiyat (USD)
- `maxPrice`: Maksimum fiyat (USD) 
- `minPopularity`: Minimum popülerlik skoru (0-1)
- `maxPopularity`: Maksimum popülerlik skoru (0-1)

**Örnek Kullanım:**
```bash
# Tüm ürünler
GET /api/products

# Fiyat aralığı filtresi
GET /api/products?minPrice=300&maxPrice=500

# Popülerlik filtresi
GET /api/products?minPopularity=0.8

# Kombinasyon filtre
GET /api/products?minPrice=200&maxPrice=400&minPopularity=0.7
```

## 🎨 Tasarım Detayları

### Renk Paleti
- **Yellow Gold**: `#E6CA97`
- **White Gold**: `#D9D9D9` 
- **Rose Gold**: `#E1A4A9`
- **Ana Metin**: `#374151` (Gray 700)
- **İkincil Metin**: `#6B7280` (Gray 500)

### Tipografi
- **Başlıklar**: Avenir Book/Medium
- **İçerik**: Montserrat Regular/Medium/SemiBold
- **Header**: "Avenir - Book - 45" (sağ üst köşe)

### Etkileşimler
- Hover efektleri ve geçiş animasyonları
- Renk seçici aktif durumu 
- Carousel geçiş animasyonları
- Loading ve error durumları

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Local font files (Avenir, Montserrat)
- **API**: RESTful API with real-time data
- **External API**: Metals API (altın fiyatları)

## 📱 Responsive Tasarım

- **Desktop**: 4 ürün yan yana
- **Tablet**: 2-3 ürün yan yana  
- **Mobile**: 1-2 ürün yan yana
- Touch ve swipe desteği tüm cihazlarda

## 🔧 Development

### Build
```bash
npm run build
```

### Start Production
```bash
npm start
```

### Lint
```bash
npm run lint
```

## 🚀 Deployment

Proje Vercel, Netlify veya benzeri platformlarda kolayca deploy edilebilir:

```bash
# Vercel ile
npx vercel

# Netlify ile
npm run build
# dist klasörünü Netlify'a yükleyin
```

## 📄 Lisans

Bu proje case study amaçlıdır.

---

**Renart** - Premium mücevher koleksiyonu için modern web deneyimi ✨ 