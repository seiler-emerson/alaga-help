import { NextResponse } from 'next/server';
import {  PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);
  
      const notifications = await prisma.floodingNotification.findMany({
        // where: {
        //   date: {
        //     gte: oneDayAgo
        //   }
        // },
        select: {
          id: true,
          latitude: true,
          longitude: true,
        },
        orderBy: {
          date: 'desc'
        }
      });
  
      return NextResponse.json(notifications);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar notificações' }, 
        { status: 500 }
      );
    }
  }