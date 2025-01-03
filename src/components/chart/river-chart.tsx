

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { format } from 'date-fns';
import { RiverDataGraph } from '@/types/RiverData';

const chartConfig = {
    observation: {
        label: "Observação",
        color: "#9ba628",
    },
    attention: {
        label: "Atenção",
        color: "#e4ff00",
    },
    alert: {
        label: "Alerta",
        color: "#ffa200",
    },
    emergency: {
        label: "Emergência",
        color: "#ff0000",
    },
    level: {
        label: "Nível Atual",
        color: "##008cff",
    },
} satisfies ChartConfig

type Props = {
    chartData: RiverDataGraph
}
export const RiverChart = ({ chartData }: Props) => {
    const getFillColor = () => {
        if (chartData) {
            const currentLevel = chartData.level[chartData.level.length - 1].level;
            if (!currentLevel) return "url(#fillLevel)";
            if (chartData.emergency !== null && currentLevel >= chartData.emergency) {
                return "url(#fillEmergency)";
            }
            if (chartData.alert !== null && currentLevel >= chartData.alert) {
                return "url(#fillAlert)";
            }
            if (chartData.attention !== null && currentLevel >= chartData.attention) {
                return "url(#fillAttention)";
            }
            if (chartData.observation !== null && currentLevel >= chartData.observation) {
                return "url(#fillObservation)";
            }
            return "url(#fillLevel)";
        }
    };

    const getSituation = () => {
        if (chartData) {
            const currentLevel = chartData.level[chartData.level.length - 1].level;
            if (chartData.emergency !== null && currentLevel >= chartData.emergency) {
                return "Emergência";
            }
            if (chartData.alert !== null && currentLevel >= chartData.alert) {
                return "Alerta";
            }
            if (chartData.attention !== null && currentLevel >= chartData.attention) {
                return "Atenção";
            }
            if (chartData.observation !== null && currentLevel >= chartData.observation) {
                return "Observação";
            }
            return "Normal";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{chartData.name}</CardTitle>
                <CardDescription>
                    Nível atual: {chartData.level[chartData.level.length - 1].level.toFixed(2)}m - Situação: {getSituation()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData.level}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                if (isNaN(date.getTime())) return '';
                                return format(date, 'HH:mm');
                            }}
                        />

                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                labelFormatter={(value) => {
                                    const date = new Date(value);
                                    if (isNaN(date.getTime())) return '';
                                    return format(date, 'dd/MM/yyyy HH:mm');
                                }}
                            />} />
                        <defs>
                            <linearGradient id="fillLevel" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#008cff"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#008cff"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillObservation" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#9ba628"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#9ba628"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillObservation" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#9ba628"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#9ba628"
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
                            dataKey="level"
                            type="natural"
                            fill={getFillColor()}
                            fillOpacity={0.4}
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
                            dataKey="emergency"
                            type="natural"
                            fill="none"
                            fillOpacity={0.4}
                            stroke="var(--color-emergency)"
                            stackId="maxAlert"
                        />

                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {chartData.name === 'Rio Itajaí-Açu - AlertaBlu' ? (

                                <span className='text-sm'>
                                    Fonte dos dados: <a href="https://alertablu.blumenau.sc.gov.br/d/nivel-do-rio" target='_blank'>AlertaBlu - Defesa Cívil - Blumenau-SC</a>
                                </span>
                            ):(
                                <span className='text-sm'>
                                    Fonte dos dados: <a href="https://defesacivil.itajai.sc.gov.br/monitoramento/nivel-rios" target='_blank'>Defesa Cívil - Itajaí-SC</a>
                                </span>
                            )
                            }
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};