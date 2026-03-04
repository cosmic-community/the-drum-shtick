import type { CustomerReview } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: CustomerReview;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const rating = review.metadata?.rating ?? 5;
  const reviewText = review.metadata?.review || '';
  const product = review.metadata?.product;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-charcoal-900">{reviewerName}</h3>
          {showProduct && product && (
            <p className="text-sm text-drum-600 font-medium mt-0.5">
              {product.metadata?.product_name || product.title}
            </p>
          )}
        </div>
        <StarRating rating={rating} />
      </div>
      {reviewText && (
        <p className="text-charcoal-600 text-sm leading-relaxed">{reviewText}</p>
      )}
    </div>
  );
}