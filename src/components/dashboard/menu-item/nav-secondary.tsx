"use client"
import * as React from "react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import * as Icons from "lucide-react";
import { SingleMenuType } from '@/types/SingleMenuType';
import { usePathname } from 'next/navigation';

export function NavSecondary({
    items: items,
    ...props
}: {
    items: SingleMenuType
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const pathname = usePathname();

    return (
        <SidebarGroup {...props}>
            {items.category &&
                <SidebarGroupLabel>{items.category}</SidebarGroupLabel>
            }
            <SidebarGroupContent>
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
                                <SidebarMenuButton asChild size="sm" isActive={isActive}>
                                    <a href={item.url} target='_blank'>
                                        <Icon className="icon" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
