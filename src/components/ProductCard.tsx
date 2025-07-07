'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductCardProps {
  name: string
  price: number
  popularityScore: number
  images: {
    yellow: string
    rose: string
    white: string
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, popularityScore, images }) => {
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'rose' | 'white'>('yellow')
  
  const colors = [
    { key: 'yellow' as const, color: '#E6CA97', label: 'Yellow Gold' },
    { key: 'white' as const, color: '#D9D9D9', label: 'White Gold' },
    { key: 'rose' as const, color: '#E1A4A9', label: 'Rose Gold' }
  ]

  // Convert popularity score to 5-star rating
  const starRating = Math.round(popularityScore * 5 * 10) / 10

  const renderStars = () => {
    const stars: React.ReactElement[] = []
    const fullStars = Math.floor(starRating)
    const hasHalfStar = starRating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="#e5e7eb"/>
              </linearGradient>
            </defs>
            <path fill={`url(#half-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        )
      } else {
        stars.push(
          <svg key={i} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        )
      }
    }
    return stars
  }

  return (
    <div className="product-card p-4 rounded-lg">
      {/* Product Image */}
      <div className="aspect-square mb-4 bg-white rounded-lg overflow-hidden">
        <Image
          src={images[selectedColor]}
          alt={`${name} - ${colors.find(c => c.key === selectedColor)?.label}`}
          width={280}
          height={280}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: '500' }}>
          {name}
        </h3>

        {/* Price */}
        <p className="font-normal text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: '400' }}>
          ${price.toFixed(2)} USD
        </p>

        {/* Color Selector */}
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.key}
              onClick={() => setSelectedColor(color.key)}
              className={`color-selector ${selectedColor === color.key ? 'active' : ''}`}
              style={{ backgroundColor: color.color }}
              aria-label={`Select ${color.label}`}
            />
          ))}
        </div>

        {/* Selected Color Label */}
        <p className="text-gray-600" style={{ fontFamily: 'Avenir, sans-serif', fontSize: '12px', fontWeight: '400' }}>
          {colors.find(c => c.key === selectedColor)?.label}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2">
          <div className="star-rating">
            {renderStars()}
          </div>
          <span className="text-gray-600" style={{ fontFamily: 'Avenir, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            {starRating}/5
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 