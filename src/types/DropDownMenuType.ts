import * as Icons from "lucide-react";
type IconName = keyof typeof Icons;

export type DropDownMenuType = {
    category?: string;
    menus: {
        title: string;
        url?: string;
        icon: IconName;
        isActive?: boolean;
        subMenu?: {
            title: string;
            url: string;
        }[];
    }[];

}