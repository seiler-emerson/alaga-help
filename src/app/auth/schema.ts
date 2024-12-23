import { z } from 'zod';

export const SignInFormSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." })
})