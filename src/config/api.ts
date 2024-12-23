// ============================================================================================== //
// =========================================== LOGIN ============================================ //
// ============================================================================================== //

import axios from 'axios';
import { api } from './axios'
import { z } from 'zod';
import { createFloodingNotificationSchema } from '@/app/app/flooding-notification/schema';

// // CAPTURA OS DADOS INCIAIS DO USUARIO LOGADO
export const getAddressByCep = async (cep: string): Promise<any> => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log(response);

    return response
}

export const getCooordinatesByAddress = async (address: string): Promise<any> => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?${address}`);
    return response
}


// Flooding Notifications
type createFloodingNotificationObject = z.infer<typeof createFloodingNotificationSchema>

export const createNotification = async (data: createFloodingNotificationObject): Promise<any> => {

    try {
        const response = await api.post('/flooding-notifications', data);
        return response;
    } catch (error) {
        throw error;
    }
}
