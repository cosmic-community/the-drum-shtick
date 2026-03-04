// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Category Not Found | The Drum Shtick' };
  }
  const name = category.metadata?.name || category.title;
  return {
    title: `${name} | The Drum Shtick`,
    description:
      category.metadata?.description || `Browse ${name} at The Drum Shtick.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const image = category.metadata?.category_image;

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-charcoal-950 text-white overflow-hidden">
        {image?.imgix_url && (
          <img
            src={`${image.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-charcoal-950/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{name}</h1>
          {description && (
            <p className="text-charcoal-300 text-lg mt-3 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          title={`${name} Products`}
          subtitle={`${products.length} item${products.length !== 1 ? 's' : ''}`}
        />

        {products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📦</span>
            <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
              No products in this category yet
            </h3>
            <p className="text-charcoal-500 mb-6">
              Check back soon or browse other categories.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-drum-500 hover:bg-drum-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}