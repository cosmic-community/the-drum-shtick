import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥁</span>
              <span className="text-lg font-bold text-white">
                The Drum <span className="text-drum-400">Shtick</span>
              </span>
            </Link>
            <p className="text-sm text-charcoal-400 leading-relaxed">
              Your one-stop shop for quality drums, drum sets, sticks, and
              accessories. Everything a drummer needs, all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-charcoal-400 hover:text-drum-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-charcoal-400 hover:text-drum-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-sm text-charcoal-400 hover:text-drum-400 transition-colors"
                >
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm text-charcoal-400 leading-relaxed mb-4">
              Have questions about our products? We&#39;re here to help you find
              the perfect gear for your drumming journey.
            </p>
            {/* Changed: Added Terms of Service link */}
            <div className="pt-2 border-t border-charcoal-800">
              <Link
                href="/terms"
                className="text-sm text-charcoal-400 hover:text-drum-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-800 mt-8 pt-8 text-center">
          <p className="text-sm text-charcoal-500">
            &copy; {new Date().getFullYear()} The Drum Shtick. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}