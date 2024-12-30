// "use client"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { NavHeader } from '@/components/dashboard/nav-header'
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import React from 'react'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {

    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
                <NavHeader/>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
