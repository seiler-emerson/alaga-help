import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updatedNotification = await prisma.floodingNotification.update({
      where: { id },
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
      },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar notificação:', error);
    return NextResponse.json({ error: 'Erro ao atualizar notificação' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const notification = await prisma.floodingNotification.findFirst({
      where: { id },
      select: {
        id: true,
        date: true,
        zipcode: true,
        street: true,
        district: true,
        city: true,
        state: true,
        observation: true,
        latitude: true,
        longitude: true,
      },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar notificação:', error);
    return NextResponse.json({ error: 'Erro ao atualizar notificação' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }>  }) {
    try {
      const { id } = await params;
  
      await prisma.floodingNotification.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: 'Notificação deletada com sucesso' }, { status: 200 });
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      return NextResponse.json({ error: 'Erro ao deletar notificação' }, { status: 500 });
    }
  }
  