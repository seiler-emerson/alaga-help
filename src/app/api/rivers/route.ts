import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const river = await prisma.river.create({
      data: {
        name: body.name,
        city: body.city,
        state: body.state
      }
    });

    return NextResponse.json(river);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar rio' },
      { status: 500 }
    );
  }
}
