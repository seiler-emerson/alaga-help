import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    LucideIcon,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"



export const followUpMenu: {
    category?: string,
    menus: {
        title: string
        url?: string
        icon: LucideIcon
        isActive?: boolean
        subMenu?: {
            title: string
            url: string
        }[]
    }[]
} = {
    category: "Acompanhamento",
    menus: [
        {
            title: "Alagamentos",
            // url: "#",
            icon: SquareTerminal,
            isActive: true,
            subMenu: [
                {
                    title: "Notificações",
                    url: "#",
                },
                {
                    title: "Mapa",
                    url: "/app/maps",
                },
            ],
        },
        {
            title: "Nível Rios",
            icon: Bot,
            subMenu: [
                {
                    title: "Gráficos",
                    url: "#",
                },
                {
                    title: "Mapas",
                    url: "#",
                },
            ],
        },
    ]
}
export const infrastructureMenu: {
    category?: string,
    menus: {
        title: string
        url?: string
        icon: LucideIcon
        isActive?: boolean
        subMenu?: {
            title: string
            url: string
        }[]
    }[]
} = {
    category: "Infraestrutura",
    menus: [
        {
            title: "Cotas",
            // url: "#",
            icon: SquareTerminal,
            isActive: true,
            subMenu: [
                {
                    title: "Cadastro",
                    url: "#",
                },
                {
                    title: "Mapa",
                    url: "/app/maps",
                },
            ],
        },
    ]
}

export const singleMenu: {
    category?: string,
    menus: {
        title: string
        url: string
        icon: LucideIcon
    }[]
} = {

    // category: "Acompanhamento",
    menus: [
        {
            title: "Dashboard",
            url: "/app/dashboard",
            icon: PieChart,
        },
    ]
}

export const aboutMenu: {
    menus: {
        title: string
        url: string
        icon: LucideIcon
    }[]
} = {

    // category: "Acompanhamento",
    menus: [
        {
            title: "Supporte",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
}

