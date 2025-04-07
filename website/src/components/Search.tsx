'use client';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  useRefinementList,
  ToggleRefinement, Pagination, RangeInput, useInstantSearch,
  CurrentRefinements,
  useClearRefinements,
  useCurrentRefinements,
  type CurrentRefinementsProps
} from 'react-instantsearch';
import './search.css' // Make sure this path is correct
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select' // Adjust path if necessary

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card' // Adjust path if necessary
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import Link from "next/link";
import {ReactNode, useEffect, useMemo, useState, useCallback} from "react";
import {Badge} from "@/components/badge"; // Adjust path if necessary
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils" // Adjust path if necessary
import {Button, buttonVariants} from "@/components/button" // Adjust path if necessary
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command" // Adjust path if necessary
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/popover" // Adjust path if necessary
import {H2, H3, P} from "@/components/Layout"; // Adjust path if necessary
import { useRouter } from "next/navigation";

const typesenseAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'YpZamILESYThUVYZZ87dIBuJorHtRPfa', // Use environment variables for API keys in production
    nodes: [{ host: 'search.canadasbuilding.com', port: 443, protocol: 'https' }],
    cacheSearchResultsForSeconds: 120,
  },
  additionalSearchParameters: {
    query_by: 'recipient,program,description',
    query_by_weights: '4,2,1',
    sort_by: (() => {
      if (typeof window === 'undefined') return '';
      const params = new URLSearchParams(window.location.search);
      const sortByParam = params.get('sort_by');
      return (sortByParam && sortByParam !== 'relevance') ? sortByParam : '';
    })()
  }
});

const searchClient = typesenseAdapter.searchClient;

const mainIndexName = 'records';

interface SearchResult {
  key: string;
  type: string;
  recipient: string;
  vendor_name?: string;
  payer: string;
  fiscal_year: string;
  program: string;
  timestamp: string;
  amount: number;
  description: string;
  award_type: string;
  // Ensure your Typesense schema includes all these fields and they are facetable if used in refinements
  province?: string;
  country?: string;
}

interface RefinementListComboboxProps {
  attribute: string;
  placeholder: string;
  width?: string;
  popoverWidth?: string;
  sortBy?: string[];
}

export function RefinementListCombobox({ attribute, placeholder, width, popoverWidth, sortBy }: RefinementListComboboxProps) {
  const {
    items,
    refine,
    searchForItems,
  } = useRefinementList({ attribute, limit: 30, sortBy: sortBy as any });

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
    // Cache items when they change after a search to avoid flicker
    if (searchChanged) {
      setCachedItems(items)
    } else {
       // If not searching, keep the cache updated with current items (e.g., initial load)
       setCachedItems(items)
    }
  }, [items, searchChanged])

  // Reset cached items when popover closes to reflect current refinements
  useEffect(() => {
    if (!open) {
      setCachedItems(items);
      setSearchChanged(false); // Reset search state
    }
  }, [open, items]);


  let label: ReactNode = refinedItem?.label ?? ""
  if (refinedItems.length > 1) {
    label = <span>{label}<Badge variant="outline" className="ml-1 text-[10px]">{`+${refinedItems.length - 1}`} more</Badge></span>
  }

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      // Don't search on open/close, only on input change
      if (!isOpen) {
        searchItems("") // Clear search when closing
      }
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
              {/* Map over cachedItems to prevent list jumping during search */}
              {cachedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value} // Use item.value for CommandItem value consistency
                  onSelect={() => {
                    setSearchChanged(false); // Reset search flag after selection
                    refine(item.value);
                    // Keep popover open for multi-select or close if desired:
                    // setOpen(false);
                  }}
                  className="flex justify-between"
                >
                  <span className="flex gap-1 items-center">
                    {/* Check refinement status based on the original `items` prop */}
                    <Check className={cn("ml-n1 h-4 w-4", items.find((i) => i.value === item.value)?.isRefined ? "opacity-100" : "opacity-0")} />
                    {item.label}
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
  // Assuming `type` looks like "grants/abc" or "contracts/xyz"
  const typeSlug = hit.type.split('/')[1] ?? 'unknown';
  const href = `/search/${typeSlug}/${hit.key}`; // Construct URL safely

  return (
    <Link href={href}>
      <Card className="w-full mb-4 hover:shadow-md transition-shadow duration-200"> {/* Added margin and hover effect */}
        <CardHeader>
          <CardTitle className="flex justify-between text-lg"> {/* Slightly larger title */}
            <h2>{hit.vendor_name || hit.recipient}</h2>
            <b className="text-blue-600">${Number(hit.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b> {/* Format currency */}
          </CardTitle>
          <p className="text-sm text-gray-700">{hit.payer}</p> {/* Slightly darker gray */}
          <p className="text-sm text-gray-500">{hit.program} {hit.timestamp && <span>({hit.timestamp})</span>}</p> {/* Conditional timestamp */}
        </CardHeader>
        <CardContent>
          {/* Ensure description exists and handle line breaks */}
          <p className="whitespace-pre-wrap line-clamp-6 text-gray-800">{(hit.description || "").replace(/\\n/g, "\n\n")}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

// --- NEW: Define the mapping for labels ---
const attributeLabels: Record<string, string> = {
  fiscal_year: 'Fiscal Year',
  payer: 'Department',
  award_type: 'Type',
  province: 'Province',
  country: 'Country',
  program: 'Program',
  recipient: 'Recipient',
};

// --- NEW: IndividualRefinementChips component ---
function IndividualRefinementChips() {
  const { items, refine } = useCurrentRefinements();
  const { canRefine: canClear, refine: clearAllRefinements } = useClearRefinements();

  // Flatten the refinements into a single list for easier rendering
  const allRefinements = items.flatMap(item => 
    item.refinements.map(refinement => {
      // Destructure refinement, excluding any potential 'attribute' key within it
      const { attribute: _internalAttribute, ...restOfRefinement } = refinement;
      
      // Create the new object with the correct structure
      const chipData = {
        attribute: item.attribute, // The attribute the refinement belongs to
        attributeLabel: attributeLabels[item.attribute] || item.attribute, // Formatted label
        ...restOfRefinement // Spread the actual refinement properties (label, value, etc.)
      };
      return chipData;
    })
  );

  if (allRefinements.length === 0) {
    return null; // Don't render anything if no refinements are active
  }

  return (
    <div className="px-4 mt-3 mb-3 flex items-center gap-2 flex-wrap">
      {allRefinements.map((refinement) => (
        <div 
          key={`${refinement.attribute}-${refinement.value}`} // Unique key for each chip
          className="flex items-center bg-gray-100 rounded-lg px-2 py-0.5 text-xs font-medium"
        >
          <span className="mr-1 font-semibold">{refinement.attributeLabel}:</span>
          <span className="mr-1.5">{refinement.label}</span>
          <button
            onClick={() => refine(refinement)} // Call refine with the specific refinement to remove
            // Simplified styles - rely more on defaults/parent
            className="ml-1 text-gray-500 hover:text-gray-800 font-bold leading-none"
            aria-label={`Remove ${refinement.label}`}
          >
            &times; {/* Simple 'x' character */}
          </button>
        </div>
      ))}
      {canClear && (
        <button
          onClick={clearAllRefinements}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

function SearchControls() {
  const { uiState, results, indexUiState, setIndexUiState, refresh } = useInstantSearch();
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window === 'undefined') return 'relevance';
    const params = new URLSearchParams(window.location.search);
    return params.get('sort_by') || 'relevance';
  });

  const hasFilters = useMemo(() => {
    const refinements = indexUiState.refinementList || {};
    const range = indexUiState.range || {};
    const toggle = indexUiState.toggle || {};
    return Object.values(refinements).some(list => list?.length > 0) ||
           Object.keys(range).length > 0 ||
           Object.keys(toggle).length > 0;
  }, [indexUiState]);

  const totalHits = results?.nbHits ?? 0;
  const router = useRouter();

  // Update the sort order using Next.js routing for a smoother UX
  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    const url = new URL(window.location.href);
    if (value && value !== 'relevance') {
      url.searchParams.set('sort_by', value);
    } else {
      url.searchParams.delete('sort_by');
    }
    // Add a loading class to the body before reload
    document.body.classList.add('reloading');
    // Scroll to top
    window.scrollTo(0, 0);
    // Short delay to ensure the loading class is applied
    setTimeout(() => {
      window.location.href = url.toString();
    }, 100);
  }, []);

  return <>
    <div className="px-4">
      <SearchBox
        placeholder="Search federal spending…"
        classNames={{
          root: 'mb-4 relative',
          form: '',
          input: '',
          submit: '',
          reset: '',
        }}
      />
    </div>
    {/* Allow filters to wrap */}
    <div className="w-full px-4 mt-2 pb-2 border-b border-gray-200">
      <div className="flex flex-wrap gap-2">
        <RefinementListCombobox attribute="payer" placeholder="Department" width="w-[145px]" sortBy={['name:asc']} />
        <RefinementListCombobox attribute="fiscal_year" placeholder="Fiscal Year" width="w-[130px]" sortBy={['name:desc']} />
        <RefinementListCombobox attribute="recipient" placeholder="Recipient" width="w-[125px]" sortBy={['name:asc']} />
        <RefinementListCombobox attribute="province" placeholder="Province" width="w-[120px]" />
        <RefinementListCombobox attribute="country" placeholder="Country" width="w-[115px]" sortBy={['name:asc']} />
        <RefinementListCombobox attribute="program" placeholder="Program" width="w-[208px]" sortBy={['name:asc']} />
        <RefinementListCombobox attribute="award_type" placeholder="Type" width="w-[100px]" popoverWidth="w-[200px]" sortBy={['name:asc']} />
      </div>
    </div>

    {/* --- Replace CurrentRefinements with the new component --- */}
    <IndividualRefinementChips />

    <div className="px-4">
      <div className="flex flex-col gap-2 mt-4">
        {/* Show results if uiState has a query OR if filters are applied */}
        {indexUiState.query || hasFilters ? (
          <>
            <div className="flex flex-wrap justify-between mb-4">
              <div className="flex items-center h-9">
                <span className="text-lg font-semibold">Results ({totalHits.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Order By:</span>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[220px] h-9 text-sm">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="amount:desc">Amount (High to Low)</SelectItem>
                    <SelectItem value="amount:asc">Amount (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Add a message if filters are active but no results found */}
            {totalHits === 0 && hasFilters && (
                <div className="text-center my-8 text-gray-600">
                    <p>No results found matching your current filters.</p>
                </div>
            )}
            <Hits hitComponent={Hit}/>
            {totalHits > 0 && ( // Only show pagination if there are hits
                <div className="flex justify-center mt-6">
                    <Pagination
                        classNames={{ // Example Tailwind styling for Pagination
                            root: 'flex list-none p-0',
                            list: 'flex list-none p-0 items-center',
                            item: 'mx-1',
                            link: 'block px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100',
                            selectedItem: 'bg-blue-600 text-white border-blue-600',
                            disabledItem: 'opacity-50 cursor-not-allowed',
                            previousPageItem: 'mr-2',
                            nextPageItem: 'ml-2',
                        }}
                    />
                </div>
            )}
          </>
        ) : (
           // Show this only if there's no query AND no filters applied (initial state)
           <div className="flex justify-center text-center mt-8">
             <H3>Not sure where to start? Try searching for:<br/> <a className="underline text-blue-600 hover:text-blue-800"
               href="?records%5Bquery%5D=Management%20Consulting&records%5BrefinementList%5D%5Bfiscal_year%5D%5B0%5D=2024-2025&records%5BrefinementList%5D%5Bfiscal_year%5D%5B1%5D=2020-2021&records%5BrefinementList%5D%5Bfiscal_year%5D%5B2%5D=2023-2024&records%5BrefinementList%5D%5Bfiscal_year%5D%5B3%5D=2021-2022&records%5BrefinementList%5D%5Bfiscal_year%5D%5B4%5D=2022-2023"
             >
               'Management Consulting' since 2020
             </a> or <a
               href="?records%5Bquery%5D=Wine"
               className="underline text-blue-600 hover:text-blue-800"
             >
               'Wine'
             </a>
             </H3>
           </div>
        )}
      </div>
    </div>
  </>;
}

export default function Search() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={mainIndexName} // Use the main index name here
      routing={true}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <SearchControls/>
    </InstantSearch>
  );
}

// FacetGroup might not be used directly if you're using RefinementListCombobox,
// but keep it if you plan to use standard RefinementList elsewhere.
function FacetGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{label}</h4>
      {children}
    </div>
  );
}