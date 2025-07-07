'use client'

import React from 'react'
import ProductCarousel from '../components/ProductCarousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Header */}
      <div className="pt-20 pb-12 text-center">
        <h1 className="font-light tracking-widest text-gray-900" style={{ fontFamily: 'Avenir, sans-serif', fontSize: '45px', fontWeight: '400' }}>
          Product List
        </h1>
      </div>

      {/* Product Carousel */}
      <div className="px-6 max-w-7xl mx-auto pb-16">
        <ProductCarousel />
      </div>
    </div>
  )
} 