'use server';

import { getAddressByCep } from '@/config/api';

export async function searchAddress(cep: string) {
    cep = cep.replace(/\D/g, '');
    const validatedCep = /^[0-9]{8}$/;
    if (!validatedCep.test(cep)) {
        throw new Error('CEP inválido');
    }
    try {
        const response = await getAddressByCep(cep)
        const data = response.data;

        return {
            street: data.logradouro,
            complement: data.complemento,
            city: data.localidade,
        };
    } catch (error) {
        throw new Error('Erro ao buscar o endereço');
    }
}