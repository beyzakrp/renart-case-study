import { NextRequest, NextResponse } from 'next/server';
import productsData from '../../../products.json';

// Gold price API'den gerçek zamanlı altın fiyatını al
async function getGoldPrice(): Promise<number> {
  try {
    // Gold-API.com kullanarak altın fiyatını al
    const response = await fetch('https://api.gold-api.com/price/XAU', {
      headers: {
        'User-Agent': 'Renart-Jewelry/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Gold API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.price && data.symbol === 'XAU') {
      // Ons başına fiyatı gram başına çevir (1 ons = 31.1035 gram)
      const pricePerGram = data.price / 31.1035;
      return Math.round(pricePerGram * 100) / 100; // 2 ondalık basamak
    }

    throw new Error('Invalid response from Gold API');
  } catch (error) {
    console.error('Gold API error:', error);
    // Fallback: Sabit fiyat (gram başına USD)
    return 65.0;
  }
}

interface BaseProduct {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

interface ProductWithPrice extends BaseProduct {
  price: number;
}

// Fiyat hesaplama fonksiyonu
function calculatePrice(popularityScore: number, weight: number, goldPrice: number): number {
  return parseFloat(((popularityScore + 1) * weight * goldPrice).toFixed(2));
}

export async function GET(request: NextRequest) {
  try {
    // Query parametrelerini al
    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const minPopularity = searchParams.get('minPopularity') ? parseFloat(searchParams.get('minPopularity')!) : undefined;
    const maxPopularity = searchParams.get('maxPopularity') ? parseFloat(searchParams.get('maxPopularity')!) : undefined;

    // Altın fiyatını al
    const goldPrice = await getGoldPrice();
    
    // Ürünleri fiyatlarıyla birlikte hazırla
    let productsWithPrices: ProductWithPrice[] = (productsData as BaseProduct[]).map((product: BaseProduct) => ({
      ...product,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice)
    }));

    // Filtreleri uygula
    if (minPrice !== undefined) {
      productsWithPrices = productsWithPrices.filter(product => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      productsWithPrices = productsWithPrices.filter(product => product.price <= maxPrice);
    }

    if (minPopularity !== undefined) {
      productsWithPrices = productsWithPrices.filter(product => product.popularityScore >= minPopularity);
    }

    if (maxPopularity !== undefined) {
      productsWithPrices = productsWithPrices.filter(product => product.popularityScore <= maxPopularity);
    }

    // Response headers ekle
    const response = NextResponse.json(productsWithPrices);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Ürünler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 