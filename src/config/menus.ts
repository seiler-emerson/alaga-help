import { DropDownMenuType } from '@/types/DropDownMenuType';
import { SingleMenuType } from '@/types/SingleMenuType';

export const followUpMenu: DropDownMenuType = {
    category: "Acompanhamento",
    menus: [
        {
            title: "Alagamentos",
            // url: "#",
            icon: "SquareTerminal",
            isActive: true,
            subMenu: [
                {
                    title: "Notificações",
                    url: "/app/flooding-notification",
                },
                {
                    title: "Mapa",
                    url: "/app/flooding-maps",
                },
            ],
        },
        {
            title: "Nível Rios",
            icon: "Bot",
            subMenu: [
                {
                    title: "Gráficos",
                    url: "/app/rivers-graph",
                },
                {
                    title: "Mapas",
                    url: "/app/rivers-map",
                },
            ],
        },
    ]
}
export const infrastructureMenu: DropDownMenuType = {
    category: "Infraestrutura",
    menus: [
        {
            title: "Cotas",
            // url: "#",
            icon: "SquareTerminal",
            isActive: true,
            subMenu: [
                {
                    title: "Cadastro",
                    url: "/app/quota-registration",
                },
                {
                    title: "Mapa",
                    url: "/app/quota-map",
                },
            ],
        },
    ]
}

export const singleMenu: SingleMenuType = {
    // category: "Acompanhamento",
    menus: [
        {
            title: "Dashboard",
            url: "/app/dashboard",
            icon: "PieChart",
        },
    ]
}

export const aboutMenu: SingleMenuType = {

    // category: "Acompanhamento",
    menus: [
        {
            title: "Supporte",
            url: "/app/support",
            icon: "LifeBuoy",
        },
        {
            title: "Feedback",
            url: "/app/feedback",
            icon: "Send",
        },
    ],
}
