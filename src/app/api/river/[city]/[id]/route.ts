import { getBlumenauLevelRiver, getItajaiLevelRiver } from '@/config/api';
import { blumenauRiversData, itajaiRiversData } from '@/data/data';
import { RiverData } from '@/types/RiverData';
import { NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { id: string, city: string } }) {
    try {
        const { id, city } = params;
        let response
        switch (city) {
            case 'itajai':
                response = await getItajaiLevelRiver(id)
                if (response) {
                    const referenceData = getItajaiRiverReference(id);
                    let levelRiver = []
                    let dataRiver: RiverData = {
                        id: id,
                        name: referenceData?.name,
                        observation: referenceData?.observation,
                        attention: referenceData?.attention,
                        alert: referenceData?.alert,
                        emergency: referenceData?.emergency,
                        level: []
                    }
                    for (let index = 0; index < response.data.length; index++) {
                        let formatValue = {
                            level: response.data[index].rio,
                            data: response.data[index].datahora,
                            observation: referenceData?.observation,
                            attention: referenceData?.attention,
                            alert: referenceData?.alert,
                            emergency: referenceData?.emergency,
                        }
                        levelRiver.push(formatValue)
                    }
                    dataRiver.level = levelRiver
                    response.data = dataRiver
                }
                return NextResponse.json(response.data);
                break;
            case 'blumenau':
                response = await getBlumenauLevelRiver()
                if (response) {
                    const referenceData = getBlumenauRiverReference(id);
                    let levelRiver = []
                    let dataRiver: RiverData = {
                        id: id,
                        name: referenceData?.name,
                        observation: referenceData?.observation,
                        attention: referenceData?.attention,
                        alert: referenceData?.alert,
                        emergency: referenceData?.emergency,
                        level: []
                    }
                    for (let index = 0; index < response.data.niveis.length; index++) {
                        let formatValue = {
                            level: response.data.niveis[index].nivel,
                            data: response.data.niveis[index].horaLeitura,
                            observation: referenceData?.observation,
                            attention: referenceData?.attention,
                            alert: referenceData?.alert,
                            emergency: referenceData?.emergency,
                        }
                        levelRiver.push(formatValue)
                    }
                    dataRiver.level = levelRiver
                    response.data = dataRiver
                }
                return NextResponse.json(response.data);
                break;

            default:
                return NextResponse.json(response);
                break;
        }

    } catch (error) {
        console.error('Erro ao buscar notificação:', error);
        return NextResponse.json({ error: 'Erro ao atualizar notificação' }, { status: 500 });
    }
}

const getItajaiRiverReference = (id: string) => {
    return itajaiRiversData.find(river => river.id === id);
}

const getBlumenauRiverReference = (id: string) => {
    return blumenauRiversData.find(river => river.id === id);
}