import { NextResponse } from 'next/server';
import { prisma } from '@/services/database';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        const state = searchParams.get('state') || undefined;
        const city = searchParams.get('city') || undefined;

        const statesQuery = prisma.floodingNotification.findMany({
            select: { state: true },
            distinct: ['state'],
            orderBy: { state: 'asc' },
        });

        const citiesQuery = state
            ? prisma.floodingNotification.findMany({
                where: { state },
                select: { city: true },
                distinct: ['city'],
                orderBy: { city: 'asc' },
            })
            : Promise.resolve([]);

        const districtsQuery = state && city
            ? prisma.floodingNotification.findMany({
                where: { state, city },
                select: { district: true },
                distinct: ['district'],
                orderBy: { district: 'asc' },
            })
            : Promise.resolve([]);

        const [states, cities, districts] = await Promise.all([
            statesQuery,
            citiesQuery,
            districtsQuery,
        ]);

        return NextResponse.json({
            states: states.map(s => s.state),
            cities: cities.map(c => c.city),
            districts: districts.map(d => d.district),
        });
    } catch (error) {
        console.error('Erro ao buscar opções de filtro:', error);
        return NextResponse.json({ error: 'Erro ao buscar opções de filtro' }, { status: 500 });
    }
}