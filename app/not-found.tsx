import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-7xl mb-6 block">🥁</span>
        <h1 className="text-4xl font-bold text-charcoal-950 mb-3">
          Page Not Found
        </h1>
        <p className="text-charcoal-500 text-lg mb-8 max-w-md mx-auto">
          Looks like this page missed the beat. Let&#39;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-drum-500 hover:bg-drum-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}