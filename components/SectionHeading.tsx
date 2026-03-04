import Link from 'next/link';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  linkHref,
  linkLabel = 'View All',
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-charcoal-500 mt-2 text-lg">{subtitle}</p>
        )}
      </div>
      {linkHref && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1 text-drum-600 font-semibold hover:text-drum-700 transition-colors text-sm shrink-0"
        >
          {linkLabel}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}