import axios from 'axios';
import { api } from './axios'
import { z } from 'zod';
import { createFloodingNotificationSchema } from '@/app/app/flooding-notification/schema';
import { Coordinate } from '@/types/Coordinate';

export const getAddressByCep = async (cep: string): Promise<any> => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log(response);

    return response
}

export const getCooordinatesByAddress = async (address: string): Promise<any> => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?${address}`);
    return response
}

export const getBoundingboxByCooordinates = async (latitude: number, longitude: number): Promise<any> => {
    console.log(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
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

export const getNotificationById = async (id: string): Promise<any> => {

    try {
        const response = await api.get('/flooding-notifications/'+id);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllFloodingNotifications = async (page: number = 1, limit: number = 10, filters: Record<string, any> = {}): Promise<{
    notifications: Array<{
        id: string;
        date: string;
        zipcode: number;
        district: string;
        city: string;
        state: string;
    }>;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        limit: number;
    }
}> => {
    try {
        const response = await api.get('/flooding-notifications', {
            params: {
                page,
                limit,
                ...filters
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllFloodingFilterOptions = async (filters: { state?: string, city?: string } = {}): Promise<{
    states: string[];
    cities: string[];
    districts: string[];
}> => {
    try {
        const response = await api.get('/flooding-notifications/filter', {
            params: filters
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllFlooding24h = async (): Promise<Coordinate[]> => {
    try {
        const response = await api.get('/flooding-notifications/global-map');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllStreetFlooding24 = async (): Promise<Coordinate[]> => {
    try {
        const response = await api.get('/flooding-notifications/global-street-map');
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getItajaiRiver1 = async (): Promise<any> => {
    
    const response = await axios.get(`https://intranet2.itajai.sc.gov.br/defesa-civil/api/telemetria?dc=DC01`);
    return response;

};
