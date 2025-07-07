'use client'

import React, { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

interface Product {
  name: string
  price: number
  popularityScore: number
  images: {
    yellow: string
    rose: string
    white: string
  }
}

interface FilterOptions {
  minPrice?: number
  maxPrice?: number
  minPopularity?: number
  maxPopularity?: number
}

// Yıldız filtreleri için ayrı interface
interface StarFilterOptions {
  minPrice?: number
  maxPrice?: number
  minStars?: number
  maxStars?: number
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({})
  const [formFilters, setFormFilters] = useState<StarFilterOptions>({})
  const [showFilters, setShowFilters] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const itemsPerView = 4
  const maxIndex = Math.max(0, products.length - itemsPerView)

  // Yıldız sayısını popularity score'a çevir (5 yıldız = 1.0 score)
  const convertStarsToScore = (stars: number): number => {
    return stars / 5
  }

  // Fetch products - sadece appliedFilters değiştiğinde çalışır
  useEffect(() => {
    fetchProducts()
  }, [appliedFilters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      
      if (appliedFilters.minPrice) queryParams.append('minPrice', appliedFilters.minPrice.toString())
      if (appliedFilters.maxPrice) queryParams.append('maxPrice', appliedFilters.maxPrice.toString())
      if (appliedFilters.minPopularity) queryParams.append('minPopularity', appliedFilters.minPopularity.toString())
      if (appliedFilters.maxPopularity) queryParams.append('maxPopularity', appliedFilters.maxPopularity.toString())

      const response = await fetch(`/api/products?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Ürünler yüklenemedi')
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < maxIndex) nextSlide()
    if (isRightSwipe && currentIndex > 0) prevSlide()
  }

  const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0

  // Filtreleri uygula - yıldızları score'a çevir
  const handleApplyFilters = () => {
    const convertedFilters: FilterOptions = {
      minPrice: formFilters.minPrice,
      maxPrice: formFilters.maxPrice,
      minPopularity: formFilters.minStars ? convertStarsToScore(formFilters.minStars) : undefined,
      maxPopularity: formFilters.maxStars ? convertStarsToScore(formFilters.maxStars) : undefined,
    }
    setAppliedFilters(convertedFilters)
    setCurrentIndex(0)
  }

  // Filtreleri temizle
  const handleClearFilters = () => {
    setFormFilters({})
    setAppliedFilters({})
    setCurrentIndex(0)
  }

  // Form input değişiklikleri
  const handleFilterChange = (field: keyof StarFilterOptions, value: string) => {
    setFormFilters(prev => ({
      ...prev,
      [field]: value ? Number(value) : undefined
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchProducts}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Belirtilen filtrelere uygun ürün bulunamadı.</p>
        {Object.keys(appliedFilters).length > 0 && (
          <button 
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-25">
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ürünler ({products.length})
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {showFilters ? 'Filtreleri Gizle' : 'Filtrele'}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Fiyat ($)</label>
              <input
                type="number"
                value={formFilters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Fiyat ($)</label>
              <input
                type="number"
                value={formFilters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Yıldız Sayısı</label>
              <input
                type="number"
                min="0"
                max="5"
                step="1"
                value={formFilters.minStars || ''}
                onChange={(e) => handleFilterChange('minStars', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Yıldız Sayısı</label>
              <input
                type="number"
                min="0"
                max="5"
                step="1"
                value={formFilters.maxStars || ''}
                onChange={(e) => handleFilterChange('maxStars', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="5"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Filtrele
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Temizle
            </button>
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="carousel-nav left"
          aria-label="Önceki ürünler"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="carousel-nav right"
          aria-label="Sonraki ürünler"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Products Grid */}
        <div 
          ref={carouselRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(products.length / itemsPerView) * 100}%`
            }}
          >
            {products.map((product, index) => (
              <div 
                key={index} 
                className="flex-none"
                style={{ width: `${100 / products.length}%` }}
              >
                <div className="px-2">
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Bar */}
        {maxIndex > 0 && (
          <div className="mt-6">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex) / (products.length)) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCarousel 