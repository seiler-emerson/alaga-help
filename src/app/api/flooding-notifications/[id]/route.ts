import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      const id = params.id;
  
      await prisma.floodingNotification.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: 'Notificação deletada com sucesso' }, { status: 200 });
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      return NextResponse.json({ error: 'Erro ao deletar notificação' }, { status: 500 });
    }
  }
  