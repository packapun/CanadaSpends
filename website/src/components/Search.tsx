'use client';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  useRefinementList,
  ToggleRefinement, Pagination, CurrentRefinements, RangeInput
} from 'react-instantsearch';
import './search.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import Link from "next/link";
import {ReactNode, useState} from "react";
import {Badge} from "@/components/badge";
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/popover"

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
  fiscal_year: string;
  program: string;
  timestamp: string;
  amount: number;
  description: string;
  award_type: string;
}



export function RefinementListCombobox({ attribute, placeholder, width }: { attribute: string, placeholder: string, width?: string }) {
  const {
    items,
    refine,
    searchForItems,
  } = useRefinementList({ attribute })

  const [open, setOpen] = useState(false)

  const refinedItems = items.filter(i => i.isRefined)
  const refinedItem = refinedItems.length > 0 ? refinedItems[0] : null
  const selectedValue = refinedItem?.value ?? ""

  let label: ReactNode = refinedItem?.label ?? ""
  if (refinedItems.length > 1) {
    label = <span>{label}<Badge variant="outline" className="ml-1 text-[10px]">{`+${refinedItems.length - 1}`} more</Badge></span>
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full pr-2 justify-between", width)}>
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {refinedItem ? label : placeholder}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", width)}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." className="h-9" onValueChange={searchForItems} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {/*<CommandItem*/}
              {/*  value=""*/}
              {/*  onSelect={() => {*/}
              {/*    refine(selectedValue) // toggle off current*/}
              {/*    setOpen(false)*/}
              {/*  }}*/}
              {/*>*/}
              {/*  All*/}
              {/*  <Check className={cn("ml-auto", !refinedItem ? "opacity-100" : "opacity-0")} />*/}
              {/*</CommandItem>*/}
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    refine(item.value)
                    // setOpen(false)
                  }}
                  className="flex justify-between"
                >


                  <span className="flex gap-1 items-baseline"><Check className={cn("ml-auto", item.isRefined ? "opacity-100" : "opacity-0")} />{item.label}</span> <Badge variant="outline" className="text-xs text-gray-500">{item.count}</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export function RefinementListDropdown({ attribute, placeholder = 'Select' }: { attribute: string, placeholder?: string }) {
  const { items, refine } = useRefinementList({ attribute })

  const refinedItem = items.find(i => i.isRefined)

  return (
    <Select
      onValueChange={(refine)}
      value={refinedItem?.value ?? 'all'}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/*<SelectItem value='all'>All</SelectItem>*/}
        {items.map(item => {
          return (
            <SelectItem className="flex justify-between" key={item.label} value={item.value}>
              <span>{item.label}</span> <Badge variant="outline">{item.count}</Badge>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  )
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
          <p className="whitespace-pre-wrap line-clamp-6">{(hit.description || "").replace("\\n", "\n\n")}</p>
        </CardContent>
      </Card>
  </Link>
}

export default function Search() {
  return (<>
  {/*<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/satellite-min.css" integrity="sha256-woeV7a4SRDsjDc395qjBJ4+ZhDdFn8AqswN1rlTO64E=" crossOrigin="anonymous"/>*/}
  {/*<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/algolia-min.css" crossOrigin="anonymous"/>*/}
    <InstantSearch searchClient={searchClient}
                   indexName="records"
                   routing={true}
                   future={{
    preserveSharedStateOnUnmount: true,
    persistHierarchicalRootCount: true,
  }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <SearchBox placeholder="Search records…" />
        <div className="flex gap-2 mt-2">
        <RefinementListCombobox attribute="recipient" placeholder="Recipient" width="w-[300px]"/>
        <RefinementListCombobox attribute="province" placeholder="Province" width="w-[300px]" />
        <RefinementListCombobox attribute="program" placeholder="Program/Contracted Item" width="w-[300px]" />

        </div>

        {/*<CurrentRefinements/>*/}

        <div style={{ display: 'flex', marginTop: '2rem', gap: '2rem' }}>
          <div style={{ width: 300 }}>
            <h3 style={{ marginBottom: '1rem' }}>Filters</h3>

            {/*<FacetGroup label="Type">*/}
            {/*  <RefinementList attribute="type" />*/}
            {/*</FacetGroup>*/}

            <FacetGroup label="Fiscal Year">
              <RefinementList attribute="fiscal_year"
                              sortBy={["name:desc"]}
                              showMore={true}
                              showMoreLimit={40}
/>
            </FacetGroup>
            {/*<RefinementListDropdown attribute="recipient" placeholder="Recipient"/>*/}

            <FacetGroup label="Department">
              <RefinementList
                attribute="payer"
                  showMore={true}
                  searchable={true}
              />
            </FacetGroup>

            {/*<FacetGroup label="Program">*/}
            {/*  <RefinementList attribute="program" />*/}
            {/*</FacetGroup>*/}


            {/*<FacetGroup label="Province">*/}
            {/*  <RefinementList attribute="province" />*/}
            {/*</FacetGroup>*/}

            <FacetGroup label="Country">
              <RefinementList attribute="country" />
            </FacetGroup>

            {/*<FacetGroup label="Recipient">*/}
            {/*  <RefinementList attribute="recipient" />*/}
            {/*</FacetGroup>*/}

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