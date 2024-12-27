import { DropDownMenuType } from '@/types/DropDownMenuType';
import { SingleMenuType } from '@/types/SingleMenuType';

export const followUpMenu: DropDownMenuType = {
    category: "Monitoramento",
    menus: [
        {
            title: "Alagamentos",
            // url: "#",
            icon: "WavesLadder",
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
            icon: "Waves",
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

