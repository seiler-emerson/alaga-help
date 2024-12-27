"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';

export type Location = {
    id: string
    date: Date
    zipcode: number
    district: string
    city: string
    state: string
}

export const columns: ColumnDef<Location>[] = [
    {
        accessorKey: "date",
        header: "Data",
        cell: ({ row }) => {
            const date = new Date(row.original.date);
            const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            return format(localDate, 'dd/MM/yyyy');
        }
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "city",
        header: "Cidade",
    },
    {
        accessorKey: "district",
        header: "Bairro",
    },
    {
        accessorKey: "zipcode",
        header: "CEP",
    },
]

