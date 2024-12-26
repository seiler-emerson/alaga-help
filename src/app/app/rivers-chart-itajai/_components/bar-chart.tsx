

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { format } from 'date-fns';

const chartConfig = {
    attention: {
        label: "Atenção",
        color: "hsl(var(--chart-4))",
    },
    alert: {
        label: "Alerta",
        color: "hsl(var(--chart-3))",
    },
    emergency: {
        label: "Emergência",
        color: "hsl(var(--chart-2))",
    },
    current: {
        label: "Nível Atual",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type Props = {
    chartData: any
    name: string
}
export const RiverChart = ({ chartData, name }: Props) => {
    const getFillColor = (data: any[]) => {
        const currentLevel = data[data.length - 1]?.rio;

        if (!currentLevel) return "url(#fillCurrent)";

        if (currentLevel >= data[data.length - 1]?.emergency) {
            console.log(data[data.length - 1]?.emergency);
            return "url(#fillEmergency)";
        }
        if (currentLevel >= data[data.length - 1]?.alert) {
            return "url(#fillAlert)";
        }
        if (currentLevel >= data[data.length - 1]?.attention) {
            return "url(#fillAttention)";
        }

        return "url(#fillCurrent)";
    };

    const getSituation = (data: any[]) => {
        const currentLevel = data[data.length - 1]?.rio;

        if (!currentLevel) return "";

        if (currentLevel >= data[data.length - 1]?.emergency) {
            console.log(data[data.length - 1]?.emergency);
            return "Emergência";
        }
        if (currentLevel >= data[data.length - 1]?.alert) {
            return "Alerta";
        }
        if (currentLevel >= data[data.length - 1]?.attention) {
            return "Atenção";
        }

        return "Normal";
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    Nível atual: {chartData[chartData?.length - 1]?.rio}m - Situação: {getSituation(chartData)}

                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="datahora"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => format(new Date(value), 'hh:mm')}
                        />

                        <YAxis />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#0027ff"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#0027ff"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillAttention" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#e4ff00"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#e4ff00"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillAlert" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#ffa200"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ffa200"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillEmergency" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#ff0000"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ff0000"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="current"
                            type="natural"
                            fill={getFillColor(chartData)}
                            fillOpacity={0.4}
                            stroke="var(--color-current)"
                            stackId="rio"
                        />
                        <Area
                            dataKey="attention"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-attention)"
                            stackId="attention"
                        />
                        <Area
                            dataKey="alert"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-alert)"
                            stackId="alert"
                        />
                        <Area
                            dataKey="emergency"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-emergency)"
                            stackId="emergency"
                        />

                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    );
};