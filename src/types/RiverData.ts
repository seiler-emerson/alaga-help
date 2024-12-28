export type RiverData = {
    id: string;
    name: string | undefined;
    observation: number | undefined | null;
    attention: number | undefined | null;
    alert: number | undefined | null;
    emergency: number | undefined | null;
    level?: {
        level: any;
        data: any;
        observation: any;
        attention: any;
        alert: any;
        emergency: any;
    }[];
}

export type RiverDataGraph = {
    id: string;
    name: string;
    observation: number | null;
    attention: number | null;
    alert: number | null;
    emergency: number | null;
    level: {
        level: number;
        data: any;
        observation: number | null;
        attention: number | null;
        alert: number | null;
        emergency: number | null;
    }[];
}