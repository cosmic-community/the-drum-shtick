import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';
import SectionHeading from '@/components/SectionHeading';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const featuredReviews = reviews
    .sort((a, b) => (b.metadata?.rating ?? 0) - (a.metadata?.rating ?? 0))
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-drum-950 opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 50%, rgba(214, 128, 50, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(214, 128, 50, 0.2) 0%, transparent 50%)',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-drum-500/20 border border-drum-400/30 rounded-full px-4 py-1.5 text-drum-300 text-sm font-medium mb-6">
              <span>🥁</span>
              <span>Premium Percussion Gear</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              The Drum{' '}
              <span className="text-drum-400">Shtick</span>
            </h1>
            <p className="text-lg sm:text-xl text-charcoal-300 mt-6 leading-relaxed max-w-2xl">
              Your one-stop shop for drums, drum sets, sticks, and accessories.
              Find the perfect gear to fuel your rhythm.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-drum-500 hover:bg-drum-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm sm:text-base"
              >
                Shop Now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 border border-charcoal-600 text-charcoal-200 hover:bg-charcoal-800 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm sm:text-base"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            title="Shop by Category"
            subtitle="Find exactly what you need"
            linkHref="/categories"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <SectionHeading
              title="Featured Products"
              subtitle="Top picks from our collection"
              linkHref="/products"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {featuredReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            title="What Drummers Say"
            subtitle="Hear from our happy customers"
            linkHref="/reviews"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-charcoal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Find Your Sound?
          </h2>
          <p className="text-charcoal-300 text-lg max-w-2xl mx-auto mb-8">
            Explore our full catalog of drums, drum sets, sticks, and accessories.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-drum-500 hover:bg-drum-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200"
          >
            Browse All Products
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}