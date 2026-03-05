import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | The Drum Shtick',
  description:
    'Get in touch with The Drum Shtick. Have questions about drums, drum sets, sticks, or accessories? Send us a message.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-8">
        <Link href="/" className="hover:text-drum-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-charcoal-700">Contact</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 mb-3">
          Get in Touch
        </h1>
        <p className="text-charcoal-500 text-lg leading-relaxed max-w-2xl">
          Have a question about our products, need help choosing the right gear,
          or just want to say hello? Fill out the form below and we&apos;ll get
          back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Email Card */}
          <div className="bg-white rounded-2xl border border-charcoal-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-drum-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-drum-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal-900">Email</h3>
            </div>
            <p className="text-sm text-charcoal-500">
              Prefer email? Reach us directly at{' '}
              <a
                href="mailto:my@email.com"
                className="text-drum-600 hover:text-drum-700 font-medium transition-colors"
              >
                my@email.com
              </a>
            </p>
          </div>

          {/* Response Time Card */}
          <div className="bg-white rounded-2xl border border-charcoal-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-drum-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-drum-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal-900">Response Time</h3>
            </div>
            <p className="text-sm text-charcoal-500">
              We typically respond within 24 hours during business days.
            </p>
          </div>

          {/* Help Card */}
          <div className="bg-drum-50 rounded-2xl border border-drum-200 p-6">
            <div className="text-2xl mb-3">🥁</div>
            <h3 className="font-semibold text-charcoal-900 mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-sm text-charcoal-500 mb-4">
              Not sure which drum or accessory is right for you? Our team is
              happy to help you find the perfect gear.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm text-drum-600 hover:text-drum-700 font-medium transition-colors"
            >
              Browse Products
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

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