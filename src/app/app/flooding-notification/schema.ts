import { z } from 'zod';

export const createFloodingNotificationSchema = z.object({
    date: z.string(),
    zipcode: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
    street: z.string().min(2, { message: "Mínimo 2 caracteres!" }).max(30, { message: "Mínimo 30 caracteres!" }),
    addressNumber: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
    district: z.string().min(2, { message: "Mínimo 2 caracteres!" }).max(30, { message: "Mínimo 30 caracteres!" }),
    city: z.string().min(2, { message: "Mínimo 2 caracteres!" }).max(30, { message: "Mínimo 30 caracteres!" }),
    state: z.string({ message: "Selecione o estado!" }),
    complement: z.string().min(2, { message: "Mínimo 2 caracteres!" }).max(30, { message: "Mínimo 30 caracteres!" }).optional().or(z.literal('')),
    observation: z.string().min(2, { message: "Mínimo 2 caracteres!" }).max(30, { message: "Mínimo 30 caracteres!" }).optional().or(z.literal('')),
    latitude: z.union([
        z.number().min(-90, { message: "A latitude deve ser maior ou igual a -90." })
            .max(90, { message: "A latitude deve ser menor ou igual a 90." }),
        z.literal(""), // Permite strings vazias
    ]),
    longitude: z.union([
        z.number().min(-180, { message: "A longitude deve ser maior ou igual a -180." })
            .max(180, { message: "A longitude deve ser menor ou igual a 180." }),
        z.literal(""), // Permite strings vazias
    ]),

})

