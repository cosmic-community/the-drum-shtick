'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { Product, ProductCategory } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  sort: string;
}

interface SearchResponse {
  products: Product[];
  categories: ProductCategory[];
  total: number;
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'on-sale', label: 'On Sale' },
];

interface SearchClientProps {
  initialQuery: string;
}

export default function SearchClient({ initialQuery }: SearchClientProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    category: '',
    minPrice: '',
    maxPrice: '',
    status: '',
    sort: 'relevance',
  });
  const [results, setResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(async (currentFilters: SearchFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.query) params.set('q', currentFilters.query);
      if (currentFilters.category) params.set('category', currentFilters.category);
      if (currentFilters.minPrice) params.set('minPrice', currentFilters.minPrice);
      if (currentFilters.maxPrice) params.set('maxPrice', currentFilters.maxPrice);
      if (currentFilters.status) params.set('status', currentFilters.status);
      if (currentFilters.sort) params.set('sort', currentFilters.sort);

      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data: SearchResponse = await response.json();
      setResults(data.products);
      setCategories(data.categories);
      setTotal(data.total);
      setHasSearched(true);
    } catch {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search for text input
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchResults(filters);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters, fetchResults]);

  // Update URL when query changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    window.history.replaceState({}, '', newUrl);
  }, [filters.query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      status: '',
      sort: 'relevance',
    });
  };

  const activeFilterCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.status,
    filters.sort !== 'relevance' ? filters.sort : '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-2">
          Search Products
        </h1>
        <p className="text-charcoal-500">
          Find the perfect drum gear from our collection
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-charcoal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={filters.query}
          onChange={handleQueryChange}
          placeholder="Search for drums, sticks, accessories..."
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-charcoal-200 rounded-2xl focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all duration-200 bg-white placeholder-charcoal-400"
          autoFocus
        />
        {filters.query && (
          <button
            onClick={() => handleFilterChange('query', '')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal-400 hover:text-charcoal-600 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Toggle & Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
              filtersOpen || activeFilterCount > 0
                ? 'border-drum-500 bg-drum-50 text-drum-700'
                : 'border-charcoal-200 bg-white text-charcoal-700 hover:border-charcoal-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-drum-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-charcoal-500 hover:text-drum-600 underline transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-charcoal-500">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="border-2 border-charcoal-200 rounded-xl px-3 py-2 text-sm bg-white focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="bg-white border-2 border-charcoal-100 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-semibold text-charcoal-700 mb-2">
                Category
              </label>
              <select
                id="category-filter"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border-2 border-charcoal-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.metadata?.name || cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  min="0"
                  className="w-full border-2 border-charcoal-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all"
                />
                <span className="text-charcoal-400">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  min="0"
                  className="w-full border-2 border-charcoal-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-semibold text-charcoal-700 mb-2">
                Availability
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border-2 border-charcoal-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:border-drum-500 focus:ring-2 focus:ring-drum-200 outline-none transition-all"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div>
              <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('status', filters.status === 'on-sale' ? '' : 'on-sale')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filters.status === 'on-sale'
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-white border-charcoal-200 text-charcoal-600 hover:border-charcoal-300'
                  }`}
                >
                  🏷️ On Sale
                </button>
                <button
                  onClick={() => handleFilterChange('status', filters.status === 'in-stock' ? '' : 'in-stock')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filters.status === 'in-stock'
                      ? 'bg-green-50 border-green-300 text-green-700'
                      : 'bg-white border-charcoal-200 text-charcoal-600 hover:border-charcoal-300'
                  }`}
                >
                  ✅ In Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {hasSearched && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-charcoal-500">
            {loading ? (
              'Searching...'
            ) : (
              <>
                <span className="font-semibold text-charcoal-700">{total}</span>{' '}
                {total === 1 ? 'product' : 'products'} found
                {filters.query && (
                  <>
                    {' '}for &ldquo;<span className="font-medium text-charcoal-700">{filters.query}</span>&rdquo;
                  </>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-charcoal-100 animate-pulse">
              <div className="aspect-square bg-charcoal-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-charcoal-100 rounded w-1/3" />
                <div className="h-5 bg-charcoal-100 rounded w-3/4" />
                <div className="h-6 bg-charcoal-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {!loading && hasSearched && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
            <SearchResultCard key={product.id} product={product} query={filters.query} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && results.length === 0 && (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
            No products found
          </h3>
          <p className="text-charcoal-500 mb-6 max-w-md mx-auto">
            {filters.query
              ? `We couldn't find any products matching "${filters.query}". Try adjusting your search or filters.`
              : 'Try adjusting your filters to see more results.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 bg-drum-500 hover:bg-drum-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-charcoal-200 hover:border-charcoal-300 text-charcoal-700 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse All
            </Link>
          </div>
        </div>
      )}

      {/* Initial State (no search yet) */}
      {!loading && !hasSearched && (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🥁</span>
          <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
            Start searching
          </h3>
          <p className="text-charcoal-500 max-w-md mx-auto">
            Type a product name or use the filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}

// Changed: Inline search result card with highlight support
interface SearchResultCardProps {
  product: Product;
  query: string;
}

function SearchResultCard({ product, query }: SearchResultCardProps) {
  const name = product.metadata?.product_name || product.title;
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const image = product.metadata?.featured_image;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;
  const isOnSale = compareAtPrice && price && Number(compareAtPrice) > Number(price);
  const isInStock =
    inventoryStatus.toLowerCase() === 'in stock' ||
    inventoryStatus.toLowerCase() === 'in_stock' ||
    inventoryStatus === '';

  // Highlight matching text
  const highlightText = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-drum-200 text-drum-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal-100 hover:border-drum-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-charcoal-100 overflow-hidden">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-drum-100">
            🥁
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              SALE
            </span>
          )}
          {!isInStock && inventoryStatus && (
            <span className="bg-charcoal-800 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {inventoryStatus}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-medium text-drum-600 uppercase tracking-wider mb-1">
            {category.title}
          </span>
        )}
        <h3 className="font-semibold text-charcoal-900 text-lg mb-2 group-hover:text-drum-700 transition-colors line-clamp-2">
          {highlightText(name, query)}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-2">
          {price !== undefined && price !== null ? (
            <>
              <span className="text-xl font-bold text-charcoal-900">
                ${Number(price).toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-sm text-charcoal-400 line-through">
                  ${Number(compareAtPrice).toFixed(2)}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm text-charcoal-500">Price unavailable</span>
          )}
        </div>
      </div>
    </Link>
  );
}