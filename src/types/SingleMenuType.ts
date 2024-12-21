import * as Icons from "lucide-react";
type IconName = keyof typeof Icons;

export type SingleMenuType = {
    category?: string,
    menus: {
        title: string
        url: string
        icon: IconName
    }[]
}