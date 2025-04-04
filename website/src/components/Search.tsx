'use client';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  useRefinementList,
  ToggleRefinement, Pagination, CurrentRefinements, RangeInput, useInstantSearch
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
import {ReactNode, useEffect, useMemo, useState} from "react";
import {Badge} from "@/components/badge";
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {Button, buttonVariants} from "@/components/button"
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
import {H2, H3, P} from "@/components/Layout";

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



export function RefinementListCombobox({ attribute, placeholder, width, popoverWidth }: { attribute: string, placeholder: string, width?: string, popoverWidth?: string }) {
  const {
    items,
    refine,
    searchForItems,
  } = useRefinementList({ attribute, limit: 30 })

  const [open, setOpen] = useState(false)
  const refinedItems = items.filter(i => i.isRefined)
  const refinedItem = refinedItems.length > 0 ? refinedItems[0] : null

  const [_search, setSearch] = useState("")
  const [searchChanged, setSearchChanged] = useState(false)
  const [cachedItems, setCachedItems] = useState(items)

  const searchItems = (value: string) => {
    setSearch(value)
    searchForItems(value)
    setSearchChanged(true)
  }

  useEffect(() => {
    if (searchChanged) {
      setCachedItems(items)
    }
  }, [items, searchChanged])

  let label: ReactNode = refinedItem?.label ?? ""
  if (refinedItems.length > 1) {
    label = <span>{label}<Badge variant="outline" className="ml-1 text-[10px]">{`+${refinedItems.length - 1}`} more</Badge></span>
  }
  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      searchItems("")
    }}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full pr-2 justify-between", width)}>
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {refinedItem ? label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", popoverWidth || "w-[300px]")}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." className="h-9" onValueChange={searchItems} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {cachedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    setSearchChanged(false)
                    refine(item.value)
                    // setOpen(false)
                  }}
                  className="flex justify-between"
                >
                  <span className="flex gap-1 items-center">
                    <Check className={cn("ml-n1", items.find((i) => i.value===item.value)?.isRefined ? "opacity-100" : "opacity-0")} />{item.label}
                  </span>
                  <Badge variant="outline" className="text-[9px] text-gray-500">{item.count}</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function Hit({ hit }: {hit: SearchResult}) {
  const href = `/search/${hit.type.split("/")[1]}/${hit.key}`

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

function SearchControls() {
  const {uiState} = useInstantSearch();

  const hasFilters = useMemo(() => Object.keys(uiState.records).length > 0, [uiState.records])
  return <>
    <div className="px-4">
      <SearchBox className="" placeholder="Search federal spending…"/>
    </div>
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 pl-4 mt-2 pb-2 min-w-max">
        <RefinementListCombobox attribute="payer" placeholder="Department" width="w-[145px]"/>
        <RefinementListCombobox attribute="fiscal_year" placeholder="Fiscal Year" width="w-[130px]"/>
        <RefinementListCombobox attribute="recipient" placeholder="Recipient" width="w-[125px]"/>
        <RefinementListCombobox attribute="province" placeholder="Province" width="w-[120px]"/>
        <RefinementListCombobox attribute="country" placeholder="Country" width="w-[115px]"/>
        <RefinementListCombobox attribute="program" placeholder="Program/Contracted Item" width="w-[240px]"/>
        <RefinementListCombobox attribute="award_type" placeholder="Type" width="w-[100px]" popoverWidth="w-[200px]"/>
      </div>
    </div>
    <div className="px-4">
      <div className="flex flex-col gap-2 mt-4">
        {hasFilters ? (
          <>
                    <H2>Results</H2>
            <Hits hitComponent={Hit}/>
        <div className="flex justify-center mt-4">
          <Pagination/>
        </div>
        </>): <div className="flex justify-center">
          <H3>Not sure where to start? Try searching: <a className="underline hover:text-blue-600"
                                                  href="?records%5Bquery%5D=Management%20Consulting&records%5BrefinementList%5D%5Bfiscal_year%5D%5B0%5D=2024-2025&records%5BrefinementList%5D%5Bfiscal_year%5D%5B1%5D=2020-2021&records%5BrefinementList%5D%5Bfiscal_year%5D%5B2%5D=2023-2024&records%5BrefinementList%5D%5Bfiscal_year%5D%5B3%5D=2021-2022&records%5BrefinementList%5D%5Bfiscal_year%5D%5B4%5D=2022-2023"
          >'Management Consulting' since 2020
          </a> or <a
            href="?records%5Bquery%5D=Wine"
            className="underline hover:text-blue-600">
            Wine
          </a>
          </H3>
        </div>}
      </div>
    </div>
  </>;
}

export default function Search() {

  return (<>
      <InstantSearch searchClient={searchClient}
                     indexName="records"
                     routing={true}
                     future={{
                       preserveSharedStateOnUnmount: true,
                       persistHierarchicalRootCount: true,
                     }}>
        <SearchControls/>
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