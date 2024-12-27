

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { format } from 'date-fns';

const chartConfig = {
    observation: {
        label: "Observação",
        color: "#e4ff00",
    },
    attention: {
        label: "Atenção",
        color: "#ffa200",
    },
    alert: {
        label: "Alerta",
        color: "#ff00c5",
    },
    maxAlert: {
        label: "Alerta Máximo (acima de 8m)",
        color: "#ff0000",
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
    const getFillColor = () => {
        if (chartData) {
            const currentLevel = chartData[23].nivel;

            if (!currentLevel) return "url(#fillCurrent)";

            if (currentLevel >= 8) {
                return "url(#fillMaxAlert)";
            }
            if (currentLevel >= 6) {
                return "url(#fillAlert)";
            }
            if (currentLevel >= 4) {
                return "url(#fillAttention)";
            }
            if (currentLevel >= 3) {
                return "url(#fillObservation)";
            }

            return "url(#fillCurrent)";
        }
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
                    {/* Nível atual: {chartData[chartData?.length - 1]?.nivel}m  */}

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
                            dataKey="horaLeitura"
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
                            <linearGradient id="fillObservation" x1="0" y1="0" x2="0" y2="1">
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
                            <linearGradient id="fillAttention" x1="0" y1="0" x2="0" y2="1">
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
                            <linearGradient id="fillAlert" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#ff00c5"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ff00c5"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMaxAlert" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#ff0200"
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
                            dataKey="nivel"
                            type="natural"
                            fill={getFillColor()}
                            fillOpacity={0.4}
                            stroke={getFillColor()}
                            stackId="rio"
                        />
                        <Area
                            dataKey="observation"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-observation)"
                            stackId="observation"
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
                            dataKey="maxAlert"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-maxAlert)"
                            stackId="maxAlert"
                        />

                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Fonte dos dados: <a href="https://alertablu.blumenau.sc.gov.br/d/nivel-do-rio" target='_blank'>AlertaBlu - Defesa Cívil - Blumenau-SC</a>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};