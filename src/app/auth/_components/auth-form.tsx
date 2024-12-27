"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast"
import { SignInFormSchema } from '../schema'
import { useState } from 'react'

export const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    type SignIObject = z.infer<typeof SignInFormSchema>

    const { handleSubmit, register, formState: { errors } } = useForm<SignIObject>({
        resolver: zodResolver(SignInFormSchema)
    })

    const handleSubmitForm = async (data: SignIObject) => {
        try {
            setIsLoading(true)
            "use server"
            await signIn('email', { email: data.email, redirect: false })
            toast({
                title: 'Link Mágico Enviado!',
                description: 'Verifique seu e-mail para acessar o sistema via link mágico!'
            })
        } catch (error) {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro, tente novamente!'
            })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form
            className={cn("flex flex-col gap-6",)}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Faça login com seu e-mail.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register('email')}
                    />
                    {errors.email &&
                        <p className='text-red-400'>{errors.email.message as string}</p>
                    }
                </div>

                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? 'Enviando...' : 'Enviar link mágico'}
                </Button>

            </div>
        </form>
    );
};