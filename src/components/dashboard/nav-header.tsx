"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {

    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
export const NavHeader = () => {
    const { setTheme } = useTheme()
    const pathname = usePathname();
    const segments = pathname
        .replace(/^\/app/, "")
        .split("/")
        .filter(Boolean);

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <header className="flex w-full h-16 shrink-0 items-center gap-2">
            <div className="flex w-full items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {segments.map((segment, index) => {
                            const isLast = index === segments.length - 1;
                            const path = "/app/" + segments.slice(0, index + 1).join("/");

                            return (
                                <React.Fragment key={path}>
                                    <BreadcrumbItem key={path}>
                                        {isLast ? (
                                            <BreadcrumbLink href={path}>
                                                {capitalize(segment)}
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem >
                                    {!isLast && <BreadcrumbSeparator key={`separator-${index}`} />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className='w-full flex justify-end'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className='h-7 w-7'>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};