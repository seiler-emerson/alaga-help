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
            icon: "Bot",
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
            url: "#",
            icon: "LifeBuoy",
        },
        {
            title: "Feedback",
            url: "#",
            icon: "Send",
        },
    ],
}

