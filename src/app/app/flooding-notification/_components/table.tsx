
"use client"

import { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTable } from '@/app/app/flooding-notification/_components/data-table';
import { getFloodingFilterOptions, getFloodingNotifications } from '../actions';
import { getAllFloodingNotifications } from '@/config/api';


export const Table = () => {
    // const notifications = await getAllNotification()
    const [data, setData] = useState<{ notifications: { id: string, city: string, date: any, district: string, state: string, zipcode: number }[], pagination: { currentPage: number, totalPages: number, totalCount: number, limit: number } }>({ notifications: [], pagination: { currentPage: 1, totalPages: 1, totalCount: 0, limit: 10 } })
    const [filters, setFilters] = useState({})
    const [filterOptions, setFilterOptions] = useState<{ states: string[], cities: string[], districts: string[] }>({ states: [], cities: [], districts: [] })
  
    const getData = async (page: number, currentFilters: any) => {
        const response = await getFloodingNotifications(page, 10, currentFilters)
        setData(response)
    };
    
    const getFilterOptions = async (currentFilters: any) => {
        const response = await getFloodingFilterOptions(currentFilters)
        setFilterOptions(response)
    };

    const handlePageChange = (newPage: number) => {
        getData(newPage, filters)
    }

    const handleFilterChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters)
        getData(1, newFilters)
        getFilterOptions(newFilters)
    }

    useEffect(() => {
        getData(1, filters)
        getFilterOptions(filters)
    }, [])

    return (
        <div className="py-10 w-full overflow-x-auto">
            {data &&
                <DataTable
                    columns={columns}
                    data={data.notifications}
                    pagination={data.pagination}
                    onPageChange={handlePageChange}
                    onFilterChange={handleFilterChange}
                    filterOptions={filterOptions}
                />
            }
        </div>
    )
};