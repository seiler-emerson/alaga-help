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

    console.log(user);


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
        userId: user.id, // Casting explícito pode ser necessário
      } as Prisma.FloodingNotificationUncheckedCreateInput,
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    return NextResponse.json({ error: 'Erro ao criar notificação' }, { status: 500 });
  }
}
