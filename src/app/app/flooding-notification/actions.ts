'use server';

import { getAddressByCep, getAllFloodingFilterOptions, getAllFloodingNotifications, getBoundingboxByCooordinates, getCooordinatesByAddress } from '@/config/api';
import { prisma } from '@/services/database';

interface FilterParams {
    state?: string;
    city?: string;
    district?: string;
}

export async function searchAddress(cep: string) {
    cep = cep.replace(/\D/g, '');
    const validatedCep = /^[0-9]{8}$/;
    if (!validatedCep.test(cep)) {
        throw new Error('CEP inválido');
    }
    try {
        const response = await getAddressByCep(cep)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error('Erro ao buscar o endereço');
    }
}

export async function searchCoordinates(address: string) {
    try {
        const response = await getCooordinatesByAddress(address)
        const data = await response.data;
        return data[0]
    } catch (error) {
        throw new Error('Erro ao buscar a coordenada');
    }
}

export async function searchBoundingbox(latitude: number, longitude: number) {

    try {
        const response = await getBoundingboxByCooordinates(latitude, longitude)
        const data = await response.data;
        return data
    } catch (error) {
        throw new Error('Erro ao buscar a coordenada');
    }
}


export async function getFloodingNotifications(page: number = 1, limit: number = 10, filters: Record<string, any> = {}) {
    const response = await getAllFloodingNotifications(page, 10, filters)
    return response
}

export async function getFloodingFilterOptions(filters: FilterParams = {}) {
    const response = await getAllFloodingFilterOptions(filters)
    return response
}
export async function createNewRiver(data: any) {
    const novoRio = await prisma.river.create({
        data: data
    });
}
