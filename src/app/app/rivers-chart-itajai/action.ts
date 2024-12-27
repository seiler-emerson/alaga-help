"use server"
import { getItajaiLevelRiver } from '@/config/api';

export async function getLevelRiver(id: string) {
    try {
        const response = await getItajaiLevelRiver(id)
        return response;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}