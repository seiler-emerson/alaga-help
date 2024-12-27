import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { auth } from '@/services/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {

    const session = await auth()

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    // Obter o ID do usuário logado (assumindo que ele está disponível na sessão)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    const data = await request.json();

    const newNotification = await prisma.floodingNotification.create({
      data: {
        date: new Date(data.date),
        zipcode: data.zipcode || null,
        street: data.street,
        addressNumber: data.addressNumber || null,
        district: data.district,
        city: data.city,
        state: data.state,
        complement: data.complement || null,
        observation: data.observation || null,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        limitLatStart: data.limitLatStart || null,
        limitLonStart: data.limitLonStart || null,
        limitLatEnd: data.limitLatEnd || null,
        limitLonEnd: data.limitLonEnd || null,
        userId: user.id, // Casting explícito pode ser necessário
      } as Prisma.FloodingNotificationUncheckedCreateInput,
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    return NextResponse.json({ error: 'Erro ao criar notificação' }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
      const { searchParams } = new URL(request.url);
      
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;

      const filters: Record<string, string> = {};
      ['district', 'city', 'state'].forEach(key => {
          const value = searchParams.get(key);
          if (value) filters[key] = value;
      });

      const where = Object.entries(filters).reduce((acc, [key, value]) => {
          if (value && value !== "") {
              return { ...acc, [key]: value };
          }
          return acc;
      }, {});

      const [notifications, totalCount] = await prisma.$transaction([
          prisma.floodingNotification.findMany({
              where,
              select: {
                  id: true,
                  date: true,
                  zipcode: true,
                  district: true,
                  city: true,
                  state: true,
              },
              skip: skip,
              take: limit,
              orderBy: {
                  date: 'desc',
              }
          }),
          prisma.floodingNotification.count({ where })
      ]);

      return NextResponse.json({
          notifications: notifications.map(notification => ({
              id: notification.id,
              date: notification.date.toISOString(),
              zipcode: notification.zipcode || 0,
              district: notification.district,
              city: notification.city,
              state: notification.state,
          })),
          pagination: {
              currentPage: page,
              totalPages: Math.ceil(totalCount / limit),
              totalCount: totalCount,
              limit: limit
          }
      });
  } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 });
  }
}