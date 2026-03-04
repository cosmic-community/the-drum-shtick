import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Customer Reviews | The Drum Shtick',
  description:
    'Read what our customers have to say about their drumming gear.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const sortedReviews = reviews.sort(
    (a, b) => (b.metadata?.rating ?? 0) - (a.metadata?.rating ?? 0)
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) /
          reviews.length
        ).toFixed(1)
      : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SectionHeading
        title="Customer Reviews"
        subtitle={
          reviews.length > 0
            ? `${reviews.length} review${reviews.length !== 1 ? 's' : ''} • ${averageRating} average rating`
            : 'No reviews yet'
        }
      />

      {/* Rating Summary */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-100 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-charcoal-950">
                {averageRating}
              </div>
              <div className="flex items-center gap-0.5 mt-2 justify-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(Number(averageRating))
                        ? 'text-amber-400'
                        : 'text-charcoal-200'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-charcoal-500 mt-1">
                Based on {reviews.length} review
                {reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(
                  (r) => (r.metadata?.rating ?? 0) === stars
                ).length;
                const percentage =
                  reviews.length > 0
                    ? Math.round((count / reviews.length) * 100)
                    : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm text-charcoal-600 w-12 text-right">
                      {stars} star
                    </span>
                    <div className="flex-1 h-2.5 bg-charcoal-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-charcoal-500 w-8">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {sortedReviews.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">⭐</span>
          <h3 className="text-xl font-semibold text-charcoal-700 mb-2">
            No reviews yet
          </h3>
          <p className="text-charcoal-500">
            Customer reviews will appear here once they&#39;re submitted.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}