# Renart Premium Jewelry Collection

A modern, jewelry showcase application built with Next.js 15, featuring real-time gold pricing, advanced filtering, and an elegant product carousel.

## ✨ Features

### 🎨 User Interface
- **Pixel-perfect design** with custom typography (Avenir & Montserrat)
- **Product carousel** with smooth transitions and navigation
- **Interactive color selection** for jewelry variants (Yellow, White, Rose Gold)
- **5-star rating system** with visual feedback
- **Modern scroll progress bar** for carousel navigation

### 🛍️ Product Management
- **Dynamic product cards** with hover effects
- **Real-time price display** based on current gold prices
- **Product image variants** for different gold types
- **Star ratings** converted from popularity scores

### 🔍 Advanced Filtering
- **Price range filtering** (minimum and maximum USD)
- **Star rating filtering** (0-5 stars)
- **Real-time filter application** with dedicated filter button
- **Filter persistence** and easy clearing options

### ⚡ Performance & API
- **Real-time gold price integration** from Gold-API
- **Caching mechanisms** for improved performance
- **RESTful API endpoints** with query parameter support
- **Error handling** and loading states

### 🎮 User Experience
- **Smooth animations** and transitions
- **Accessibility features** with proper ARIA labels

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/beyzakrp/renart-case-study.git
   cd renart-case-study
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   └── api/products/        # Products API endpoint
├── components/
│   ├── ProductCard.tsx      # Individual product display
│   └── ProductCarousel.tsx  # Main carousel component
├── styles/
│   └── globals.css          # Global styles and font definitions
└── products.json            # Product data

public/
└── fonts/                   # Custom font files
    ├── Avenir-Book.ttf
    ├── Avenir-Medium.ttf
    ├── Montserrat-Regular.ttf
    ├── Montserrat-Medium.otf
    └── Montserrat-SemiBold.otf
```

## 🔌 API Endpoints

### GET `/api/products`
Retrieve products with optional filtering

**Query Parameters:**
- `minPrice` - Minimum price in USD
- `maxPrice` - Maximum price in USD  
- `minPopularity` - Minimum popularity score (0-1)
- `maxPopularity` - Maximum popularity score (0-1)

**Example:**
```bash
curl "https://renart-case-study-one.vercel.app/api/products?minPrice=400&maxPrice=800"
```

## 🎨 Design System

### Color Palette
- **Primary**: #1f2937 (Gray 800)
- **Secondary**: #6b7280 (Gray 500)
- **Background**: #ffffff (White)
- **Accent**: #f9fafb (Gray 50)
- **Yellow Gold**: `#E6CA97`
- **White Gold**: `#D9D9D9` 
- **Rose Gold**: `#E1A4A9`

### Typography
- **Headers**: Avenir Book (45px)
- **Body**: Montserrat Regular/Medium/SemiBold
- **UI Elements**: System fonts with fallbacks

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Avenir, Montserrat
- **API**: Next.js API Routes with real-time gold pricing
- **Build Tool**: Next.js built-in bundler



## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 License

This project is developed for case study purposes.

---

**Live Demo**: [https://renart-case-study-one.vercel.app/](https://renart-case-study-one.vercel.app/)  
**Repository**: [GitHub](https://github.com/beyzakrp/renart-case-study.git) 