"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronsUpDown, Cross, RouteOff, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
  }
  onPageChange: (page: number) => void
  onFilterChange: (filters: Record<string, string>) => void
  filterOptions: {
    states: string[]
    cities: string[]
    districts: string[]
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onFilterChange,
  filterOptions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [filters, setFilters] = React.useState<Record<string, string>>({
    state: "",
    city: "",
    district: "",
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleFilterChange = (columnId: string, value: string) => {
    const newFilters = { ...filters, [columnId]: value === "all" ? "" : value }
    if (columnId === 'state') {
      newFilters.city = ""
      newFilters.district = ""
    } else if (columnId === 'city') {
      newFilters.district = ""
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const newFilters = {
      state: "",
      city: "",
      district: ""
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const [stateOpen, setStateOpen] = React.useState(false)
  const [cityOpen, setCityOpen] = React.useState(false)
  const [districtOpen, setDistrictOpen] = React.useState(false)
  const isFiltered = filters.state !== "" || filters.city !== "" || filters.district !== ""

  return (
    <div className='w-full overflow-auto'>
      <div className="flex flex-col md:flex-row items-start md:items-center py-4 gap-2 md:gap-0">
        <div className='flex items-center'>
          <SlidersHorizontal className="ml-2 h-4 w-4" />
          <span className='text-sm mx-2'>Filtros:</span>
        </div>
        <Popover open={stateOpen} onOpenChange={setStateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={stateOpen}
              className="w-full md:w-[180px] mr-2 justify-between"
            >
              {filters.state || "Estado"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Procurar..." />
              <CommandList>
                <CommandEmpty>Sem resultado...</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="all"
                    value="all"
                    onSelect={() => {
                      handleFilterChange("state", "all")
                      setStateOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.state === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Todos
                  </CommandItem>
                  {filterOptions.states.map((state) => (
                    <CommandItem
                      key={state}
                      value={state}
                      onSelect={() => {
                        handleFilterChange("state", state)
                        setStateOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.state === state ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {state}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* City Combobox */}
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              className="w-full md:w-[180px] mr-2 justify-between"
              disabled={!filters.state}
            >
              {filters.city || "Cidade"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandList>
                <CommandEmpty>Sem resultado...</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="all"
                    value="all"
                    onSelect={() => {
                      handleFilterChange("city", "all")
                      setCityOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.city === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Todos
                  </CommandItem>
                  {filterOptions.cities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={() => {
                        handleFilterChange("city", city)
                        setCityOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.city === city ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* District Combobox */}
        <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={districtOpen}
              className="w-full md:w-[180px] mr-2 justify-between"
              disabled={!filters.city}
            >
              {filters.district || "Bairro"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search district..." />
              <CommandList>
                <CommandEmpty>Sem resultado...</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="all"
                    value="all"
                    onSelect={() => {
                      handleFilterChange("district", "all")
                      setDistrictOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.district === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    Todos
                  </CommandItem>
                  {filterOptions.districts.map((district) => (
                    <CommandItem
                      key={district}
                      value={district}
                      onSelect={() => {
                        handleFilterChange("district", district)
                        setDistrictOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.district === district ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {district}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => handleClearFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar Filtros
            <RouteOff className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table className='min-w-full w-full relative'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Listando {pagination.limit * (pagination.currentPage - 1) + 1} ao {Math.min(pagination.limit * pagination.currentPage, pagination.totalCount)} de {pagination.totalCount} resultados
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

