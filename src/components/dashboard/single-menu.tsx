"use client"

import {
    Folder,
    MoreHorizontal,
    Share,
    Trash2,
    type LucideIcon,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function SingleMenu({
    items: items,
}: {
    items: {
        category?: string,
        menus: {
            title: string
            url: string
            icon: LucideIcon
        }[]
    }
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {items.category &&
                <SidebarGroupLabel>{items.category}</SidebarGroupLabel>
            }
            <SidebarMenu>
                {items.menus.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
