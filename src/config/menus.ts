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

    category: "Autoridades Competentes",
    menus: [
        {
            title: "Defesa Civil - SC",
            url: "https://www.defesacivil.sc.gov.br/",
            icon: "LifeBuoy",
        },
    ],
}
export const devMenu: SingleMenuType = {

    category: "Sobre o desenvolvedor",
    menus: [
        {
            title: "Linkedin",
            url: "https://www.linkedin.com/in/seileremerson/",
            icon: "Linkedin",
        },
        {
            title: "Youtube",
            url: "https://www.youtube.com/emersonseiler",
            icon: "Youtube",
        },
        {
            title: "Github",
            url: "https://github.com/seiler-emerson",
            icon: "Github",
        },
    ],
}

