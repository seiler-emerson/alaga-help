"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { SingleMenuType } from '@/types/SingleMenuType';

import * as Icons from "lucide-react";
type IconName = keyof typeof Icons;

export function SingleMenu({
    items: items,
}: {
    items: SingleMenuType
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {items.category &&
                <SidebarGroupLabel>{items.category}</SidebarGroupLabel>
            }
            <SidebarMenu>
                {items.menus.map((item) => {
                    const Icon = Icons[item.icon] as React.ElementType; // Garante que é um componente válido
                    if (!Icon) {
                        console.warn(`Ícone ${item.icon} não encontrado ou inválido.`);
                        return null;
                    }
                    return (

                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
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
