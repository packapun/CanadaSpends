'use client';

import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { SearchResult } from '../types/search';
import { formatCurrency } from '../utils/csvUtils';

// Rename Hit to HitCard for clarity, or keep as Hit if preferred
export function HitCard({ hit }: { hit: SearchResult }) {
  const typeSlug = hit.type?.split('/')[1] ?? 'unknown';
  // Use objectID provided by InstantSearch for unique key in lists/maps
  const href = `/search/${typeSlug}/${hit.key || hit.objectID}`;
  const displayRecipient = hit.vendor_name || hit.recipient;
  const formattedAmount = formatCurrency(hit.amount);

  return (
    <Link href={href}>
      <Card className="w-full mb-4 hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <h2>{displayRecipient}</h2>
            <b className="text-blue-600">${formattedAmount}</b>
          </CardTitle>
          <p className="text-sm text-gray-700">{hit.payer}</p>
          <p className="text-sm text-gray-500">{hit.program} {hit.timestamp && <span>({hit.timestamp})</span>}</p>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap line-clamp-6 text-gray-800">{(hit.description || "").replace(/\\n/g, "\n\n")}</p>
        </CardContent>
      </Card>
    </Link>
  );
} 