import { NextRequest, NextResponse } from 'next/server';
import { searchProducts, getCategories } from '@/lib/cosmic';
import type { Product, ProductCategory } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export interface SearchAPIResponse {
  products: Product[];
  categories: ProductCategory[];
  total: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<SearchAPIResponse | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const categorySlug = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sort') || 'relevance';

    // Fetch all products matching the text query from Cosmic
    const allProducts = await searchProducts(query);
    const categories = await getCategories();

    // Apply client-side filters for category, price, and status
    let filtered = allProducts;

    // Filter by category slug
    if (categorySlug) {
      filtered = filtered.filter((product) => {
        const cat = product.metadata?.category;
        if (!cat) return false;
        return cat.slug === categorySlug;
      });
    }

    // Filter by price range
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter((product) => {
          const price = product.metadata?.price;
          return price !== undefined && price !== null && Number(price) >= min;
        });
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((product) => {
          const price = product.metadata?.price;
          return price !== undefined && price !== null && Number(price) <= max;
        });
      }
    }

    // Filter by inventory status
    if (status) {
      filtered = filtered.filter((product) => {
        const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status).toLowerCase();
        if (status === 'in-stock') {
          return inventoryStatus === 'in stock' || inventoryStatus === 'in_stock' || inventoryStatus === '';
        }
        if (status === 'out-of-stock') {
          return inventoryStatus === 'out of stock' || inventoryStatus === 'out_of_stock';
        }
        if (status === 'on-sale') {
          const price = product.metadata?.price;
          const compareAt = product.metadata?.compare_at_price;
          return compareAt && price && Number(compareAt) > Number(price);
        }
        return true;
      });
    }

    // Sort results
    filtered = sortProducts(filtered, sortBy, query);

    return NextResponse.json({
      products: filtered,
      categories,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}

function sortProducts(products: Product[], sortBy: string, query: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => {
        const priceA = Number(a.metadata?.price ?? 0);
        const priceB = Number(b.metadata?.price ?? 0);
        return priceA - priceB;
      });
      break;
    case 'price-desc':
      sorted.sort((a, b) => {
        const priceA = Number(a.metadata?.price ?? 0);
        const priceB = Number(b.metadata?.price ?? 0);
        return priceB - priceA;
      });
      break;
    case 'name-asc':
      sorted.sort((a, b) => {
        const nameA = (a.metadata?.product_name || a.title).toLowerCase();
        const nameB = (b.metadata?.product_name || b.title).toLowerCase();
        return nameA.localeCompare(nameB);
      });
      break;
    case 'name-desc':
      sorted.sort((a, b) => {
        const nameA = (a.metadata?.product_name || a.title).toLowerCase();
        const nameB = (b.metadata?.product_name || b.title).toLowerCase();
        return nameB.localeCompare(nameA);
      });
      break;
    case 'newest':
      sorted.sort((a, b) => {
        const dateA = new Date(a.created_at || '').getTime();
        const dateB = new Date(b.created_at || '').getTime();
        return dateB - dateA;
      });
      break;
    case 'relevance':
    default:
      // For relevance, prioritize exact title matches
      if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        sorted.sort((a, b) => {
          const nameA = (a.metadata?.product_name || a.title).toLowerCase();
          const nameB = (b.metadata?.product_name || b.title).toLowerCase();
          const startsA = nameA.startsWith(lowerQuery) ? 0 : 1;
          const startsB = nameB.startsWith(lowerQuery) ? 0 : 1;
          if (startsA !== startsB) return startsA - startsB;
          const containsA = nameA.includes(lowerQuery) ? 0 : 1;
          const containsB = nameB.includes(lowerQuery) ? 0 : 1;
          return containsA - containsB;
        });
      }
      break;
  }

  return sorted;
}