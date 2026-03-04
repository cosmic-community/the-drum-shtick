// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | The Drum Shtick' };
  }
  const name = product.metadata?.product_name || product.title;
  return {
    title: `${name} | The Drum Shtick`,
    description:
      product.metadata?.description?.slice(0, 160) || `Shop ${name} at The Drum Shtick.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const name = product.metadata?.product_name || product.title;
  const description = product.metadata?.description || '';
  const price = product.metadata?.price;
  const compareAtPrice = product.metadata?.compare_at_price;
  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const sku = product.metadata?.sku;
  const category = product.metadata?.category;
  const isOnSale = compareAtPrice && price && compareAtPrice > price;
  const isInStock =
    inventoryStatus.toLowerCase() === 'in stock' ||
    inventoryStatus.toLowerCase() === 'in_stock' ||
    inventoryStatus === '';

  const allImages = [
    ...(featuredImage ? [featuredImage] : []),
    ...(gallery || []),
  ];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) /
        reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-charcoal-500 mb-8">
        <Link href="/" className="hover:text-drum-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-drum-600 transition-colors">
          Products
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-drum-600 transition-colors"
            >
              {category.metadata?.name || category.title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-charcoal-900 font-medium truncate">{name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-charcoal-100 rounded-2xl overflow-hidden">
            {allImages.length > 0 && allImages[0] ? (
              <img
                src={`${allImages[0].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl bg-drum-100">
                🥁
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {allImages.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-charcoal-100 rounded-xl overflow-hidden"
                >
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} view ${idx + 2}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-drum-600 hover:text-drum-700 uppercase tracking-wider transition-colors"
            >
              {category.metadata?.name || category.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 mt-2 mb-4">
            {name}
          </h1>

          {/* Rating Summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(averageRating)} size="md" />
              <span className="text-sm text-charcoal-500">
                ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {price !== undefined && price !== null ? (
              <>
                <span className="text-3xl font-bold text-charcoal-950">
                  ${Number(price).toFixed(2)}
                </span>
                {isOnSale && (
                  <span className="text-lg text-charcoal-400 line-through">
                    ${Number(compareAtPrice).toFixed(2)}
                  </span>
                )}
                {isOnSale && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    SAVE $
                    {(Number(compareAtPrice) - Number(price)).toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg text-charcoal-500">
                Price unavailable
              </span>
            )}
          </div>

          {/* Inventory */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isInStock ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isInStock ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {inventoryStatus || 'In Stock'}
            </span>
          </div>

          {/* SKU */}
          {sku && (
            <p className="text-xs text-charcoal-400 mb-6">SKU: {sku}</p>
          )}

          {/* Description */}
          {description && (
            <div className="prose prose-charcoal max-w-none mb-8">
              <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
                Description
              </h3>
              <div
                className="text-charcoal-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-16 border-t border-charcoal-200 pt-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}