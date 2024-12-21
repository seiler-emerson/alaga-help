import { PrismaClient } from '@prisma/client';
import { auth } from '../auth';

export const prisma = new PrismaClient()