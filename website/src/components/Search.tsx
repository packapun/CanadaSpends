'use client';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  ToggleRefinement, Pagination
} from 'react-instantsearch';
import './search.css'

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import Link from "next/link";
import {ReactNode} from "react";

const typesenseAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'YpZamILESYThUVYZZ87dIBuJorHtRPfa',
    nodes: [{ host: 'search.canadasbuilding.com', port: 443, protocol: 'https' }],
    cacheSearchResultsForSeconds: 120,
  },
  additionalSearchParameters: {
    query_by: 'program,description',
  },
});

const searchClient = typesenseAdapter.searchClient;

interface SearchResult {
  key: string;
  type: string;
  recipient: string;
  payer: string;
  program: string;
  timestamp: string;
  amount: number;
  description: string;
  award_type: string;
}

function Hit({ hit }: {hit: SearchResult}) {
  // get base path
  const href = `/spending-database/${hit.type.split("/")[1]}/${hit.key}`


  return       <Link href={href}><Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h2>{hit.recipient}</h2>
            <b>${Number(hit.amount).toLocaleString()}</b>
          </CardTitle>
          <p className="text-xs text-gray-600">{hit.payer}</p>
          <p className="text-xs text-gray-600">{hit.program} <span>({hit.timestamp})</span></p>
      </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap line-clamp-6">{hit.description.replace("\\n", "\n\n")}</p>
        </CardContent>
      </Card>
  </Link>
}

export default function Search() {
  return (<>
  {/*<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/satellite-min.css" integrity="sha256-woeV7a4SRDsjDc395qjBJ4+ZhDdFn8AqswN1rlTO64E=" crossOrigin="anonymous"/>*/}
    <InstantSearch searchClient={searchClient} indexName="records" future={{
    preserveSharedStateOnUnmount: true,
    persistHierarchicalRootCount: true,
  }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <SearchBox placeholder="Search records…" />

        <div style={{ display: 'flex', marginTop: '2rem', gap: '2rem' }}>
          <div style={{ width: 300 }}>
            <h3 style={{ marginBottom: '1rem' }}>Filters</h3>

            <FacetGroup label="Type">
              <RefinementList attribute="type" />
            </FacetGroup>

            <FacetGroup label="Program">
              <RefinementList attribute="program" />
            </FacetGroup>

            <FacetGroup label="Payer">
              <RefinementList attribute="payer" />
            </FacetGroup>

            <FacetGroup label="Province">
              <RefinementList attribute="province" />
            </FacetGroup>

            <FacetGroup label="Country">
              <RefinementList attribute="country" />
            </FacetGroup>

            <FacetGroup label="Recipient">
              <RefinementList attribute="recipient" />
            </FacetGroup>

            <FacetGroup label="Award Type">
              <RefinementList attribute="award_type" />
            </FacetGroup>
            {/*TODO: See why this didn't import properly*/}
            {/*<FacetGroup label="Aggregated Awards">*/}
            {/*  <ToggleRefinement attribute="is_aggregated" />*/}
            {/*</FacetGroup>*/}
          </div>

          <div style={{ flex: 1 }}>
            <Hits hitComponent={Hit} />
            <div className="flex justify-center mt-4">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  </>
  );
}

function FacetGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{label}</h4>
      {children}
    </div>
  );
}