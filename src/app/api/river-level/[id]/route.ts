import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const river = await prisma.river.findUnique({
            where: { 
                id
            },
            select: {
                id: true,
                name: true,
            }
        });

        const riverLevels = await prisma.riverLevel.findMany({
            where: { 
                riverId: id
            },
            orderBy: {
                date: 'asc'
            },
            take: 72,
            select: {
                date: true,
                level: true,
                observation: true,
                attention: true,
                alert: true,
                emergency: true
            }
        });

        let formatValue = {
            id: id,
            name: river?.name,
            observation: riverLevels[riverLevels.length -1]?.observation ?? null,
            attention: riverLevels[riverLevels.length -1]?.attention ?? null,
            alert: riverLevels[riverLevels.length -1]?.alert ?? null,
            emergency: riverLevels[riverLevels.length -1]?.emergency ?? null,
            level: riverLevels
        }

        return NextResponse.json(formatValue, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar notificação:', error);
        return NextResponse.json({ error: 'Erro ao atualizar notificação' }, { status: 500 });
    }
}

