import Link from 'next/link';
import type { ProductCategory } from '@/types';

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const image = category.metadata?.category_image;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal-100 hover:border-drum-200"
    >
      <div className="relative aspect-[4/3] bg-charcoal-100 overflow-hidden">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-drum-100">
            🏷️
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          {description && (
            <p className="text-sm text-charcoal-200 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}