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
                    title: "Mapa - Pontos Alagados",
                    url: "/app/flooding-maps",
                },
                {
                    title: "Mapa - Ruas Alagadas",
                    url: "/app/flooding-street-maps",
                },
                {
                    title: "Mapa - Calor",
                    url: "/app/flooding-heat-maps",
                },
            ],
        },
        {
            title: "Nível Rios",
            icon: "Bot",
            subMenu: [
                {
                    title: "Itajaí - SC",
                    url: "/app/rivers-chart-itajai",
                },
                {
                    title: "Blumenau - SC",
                    url: "/app/rivers-chart-blumenau",
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

