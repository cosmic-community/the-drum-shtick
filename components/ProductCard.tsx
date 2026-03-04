import Link from 'next/link';
import type { Product } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = product.metadata?.product_name || product.title;
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const image = product.metadata?.featured_image;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;
  const isOnSale = compareAtPrice && price && compareAtPrice > price;
  const isInStock =
    inventoryStatus.toLowerCase() === 'in stock' ||
    inventoryStatus.toLowerCase() === 'in_stock' ||
    inventoryStatus === '';

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
          {name}
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