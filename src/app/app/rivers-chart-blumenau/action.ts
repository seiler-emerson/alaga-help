"use server"
import { getBlumenauLevelRiver } from '@/config/api';

export async function getNivelRio() {
    try {
        const response = await getBlumenauLevelRiver()
        return response.data.niveis;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}