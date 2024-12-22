import { z } from 'zod';

export const createFloodingNotificationSchema = z.object({
    date: z.string(),
    zipcode: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
    street: z.string().min(2, {message: "Mínimo 2 caracteres!"}).max(30, {message: "Mínimo 30 caracteres!"}),
    addressNumber: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
    // addressNumber: z.number({message: "Apenas números são permitidos!"}).gt(0).int().optional(),
    district: z.string().min(2, {message: "Mínimo 2 caracteres!"}).max(30, {message: "Mínimo 30 caracteres!"}),
    city: z.string().min(2, {message: "Mínimo 2 caracteres!"}).max(30, {message: "Mínimo 30 caracteres!"}),
    complement: z.string().min(2, {message: "Mínimo 2 caracteres!"}).max(30, {message: "Mínimo 30 caracteres!"}).optional().or(z.literal('')),
    observation: z.string().min(2, {message: "Mínimo 2 caracteres!"}).max(30, {message: "Mínimo 30 caracteres!"}).optional().or(z.literal('')),
    latitude: z.string(),
    longitude: z.string(),
})

