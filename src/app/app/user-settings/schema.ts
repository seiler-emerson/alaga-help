import { z } from 'zod';

export const updateProfileSchema = z.object({
    name: z.string().min(2, {message: "Mínimo 2 caracteres."}).max(30, {message: "Máximo 30 caracteres."}),
    email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
})