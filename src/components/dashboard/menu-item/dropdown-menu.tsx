"use client"

import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import * as Icons from "lucide-react";
import { DropDownMenuType } from '@/types/DropDownMenuType';
import { usePathname } from 'next/navigation';


export function DropDownMenu({ items, }: { items: DropDownMenuType }) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
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
                    const isAnySubmenuActive = item.subMenu?.some(
                        subItem => pathname === subItem.url
                    )
                    return (
                        <Collapsible key={item.title} asChild defaultOpen={isAnySubmenuActive }>
                            <SidebarMenuItem className='cursor-pointer'>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <Icon className="icon" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                {item.subMenu?.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.subMenu?.map((subItem) => {
                                                    const isActive = pathname === subItem.url;
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild isActive={isActive} >
                                                                <a href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : null}
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
