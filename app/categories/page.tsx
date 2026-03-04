import type { Metadata } from 'next';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Product Categories | The Drum Shtick',
  description:
    'Browse drums, drum sets, sticks, and accessories by category.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SectionHeading
        title="Product Categories"
        subtitle="Browse our collection by category"
      />

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🏷️</span>
          <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
            No categories yet
          </h3>
          <p className="text-charcoal-500">
            Categories will appear here once they&#39;re added.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}