"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { SingleMenuType } from '@/types/SingleMenuType';
import { usePathname } from 'next/navigation';
import * as Icons from "lucide-react";

export function SingleMenu({
    items: items,
}: {
    items: SingleMenuType
}) {
    const { isMobile } = useSidebar()
    const pathname = usePathname();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {items.category &&
                <SidebarGroupLabel>{items.category}</SidebarGroupLabel>
            }
            <SidebarMenu>
                {items.menus.map((item) => {
                    const isActive = pathname === item.url;
                    const Icon = Icons[item.icon] as React.ElementType; // Garante que é um componente válido
                    if (!Icon) {
                        console.warn(`Ícone ${item.icon} não encontrado ou inválido.`);
                        return null;
                    }
                    return (

                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive}>
                                <a href={item.url}>
                                    <Icon className="icon" />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
