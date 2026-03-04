import type { Metadata } from 'next';
import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'All Products | The Drum Shtick',
  description:
    'Browse our full selection of drums, drum sets, sticks, and accessories.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SectionHeading
        title="All Products"
        subtitle={`${products.length} item${products.length !== 1 ? 's' : ''} available`}
      />

      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🥁</span>
          <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
            No products yet
          </h3>
          <p className="text-charcoal-500">
            Products will appear here once they&#39;re added to the store.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}