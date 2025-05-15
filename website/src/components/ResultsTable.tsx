'use client';

import { useHits } from 'react-instantsearch';
import Link from "next/link";
import { SearchResult } from '../types/search';
import { formatCurrency } from '../utils/csvUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/button";
import { useEffect } from 'react';

// --- ResultsTable Component --- 
export function ResultsTable({ onDataUpdate }: { onDataUpdate?: (data: SearchResult[]) => void }) {
  const { hits } = useHits<SearchResult>();

    // Notify parent component of the hits data
    useEffect(() => {
      if (onDataUpdate) {
        onDataUpdate(hits);
      }
    }, [hits, onDataUpdate]);

  return (
    <div className="border rounded-md overflow-hidden mb-8">
      <div className="max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[30%] pl-4 pr-2 sm:pl-6">Recipient / Department</TableHead>
            <TableHead className="w-[25%] hidden md:table-cell px-2">Program</TableHead>
            <TableHead className="w-[15%] hidden sm:table-cell px-2">Fiscal Year</TableHead>
            <TableHead className="w-[15%] text-right px-2">Amount</TableHead>
            <TableHead className="w-[15%] text-center px-2 pr-4 sm:pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody className="max-h-[400px] overflow-y-auto overflow-x-hidden">
          {hits.map((hit) => {
            const typeSlug = hit.type?.split('/')[1] ?? 'unknown';
            const href = `/search/${typeSlug}/${hit.key || hit.objectID}`;
            const displayRecipient = hit.vendor_name || hit.recipient;
            const formattedAmount = formatCurrency(hit.amount);

            return (
              <TableRow key={hit.objectID} className="hover:bg-gray-50">
                <TableCell className="pl-4 pr-2 sm:pl-6">
                  <div>
                    <div className="font-medium">{displayRecipient}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[250px] sm:max-w-[300px]" title={hit.payer}>
                      {hit.payer}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate px-2" title={hit.program}>
                  {hit.program}
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2">{hit.fiscal_year}</TableCell>
                <TableCell className="text-right font-medium text-blue-600 px-2">${formattedAmount}</TableCell>
                <TableCell className="text-center px-2 pr-4 sm:pr-6">
                  <Link href={href} legacyBehavior={false}>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        
      </Table>
      </div>
    </div>
  );
} 