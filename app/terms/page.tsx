import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Terms of Service | The Drum Shtick',
  description:
    'Read the Terms of Service for The Drum Shtick online drum store.',
};

export default async function TermsOfServicePage() {
  const page = await getPageBySlug('terms-of-service');

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 mb-4">
          Terms of Service
        </h1>
        <p className="text-charcoal-500">
          Terms of Service content is not available at this time. Please check
          back later.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-drum-600 hover:text-drum-700 font-medium mt-8 transition-colors"
        >
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  const heading = page.metadata?.heading ?? 'Terms of Service';
  const content = page.metadata?.content ?? '';
  const lastUpdated = page.metadata?.last_updated ?? '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-8">
        <Link
          href="/"
          className="hover:text-drum-600 transition-colors"
        >
          Home
        </Link>
        <span>/</span>
        <span className="text-charcoal-700">Terms of Service</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 mb-3">
          {heading}
        </h1>
        {lastUpdated && (
          <p className="text-sm text-charcoal-400">
            Last updated:{' '}
            {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Content */}
      <div
        className="prose prose-charcoal max-w-none prose-headings:text-charcoal-950 prose-headings:font-bold prose-p:text-charcoal-600 prose-p:leading-relaxed prose-a:text-drum-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal-800 prose-ul:text-charcoal-600 prose-ol:text-charcoal-600 prose-li:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-charcoal-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-drum-600 hover:text-drum-700 font-medium transition-colors"
        >
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}