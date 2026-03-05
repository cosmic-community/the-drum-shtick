import type { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search Products | The Drum Shtick',
  description: 'Search through our full selection of drums, drum sets, sticks, and accessories.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const initialQuery = q || '';

  return <SearchClient initialQuery={initialQuery} />;
}