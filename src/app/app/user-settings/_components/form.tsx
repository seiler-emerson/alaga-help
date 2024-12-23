'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Session } from 'next-auth'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { updateProfileSchema } from '../schema'
import { updateProfile } from '../action'
import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'

type ProfileFormProps = {
    defaultValues: Session['user']
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {

    const router = useRouter()
    type updateProfileObject = z.infer<typeof updateProfileSchema>

    const { handleSubmit, register, formState: { errors, isSubmitting, isLoading }, control } = useForm<updateProfileObject>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            email: defaultValues?.email ?? '',
        },
    })

    const handleSubmitForm = async (data: updateProfileObject) => {
        try {
            await updateProfile(data)
            router.refresh()

            toast({
                title: 'Sucesso',
                description: 'Seu perfil foi atualizado com sucesso.',
            })
        } catch (error) {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro, tente novamente!'
            })
        }
    }

    return (
        <div className='w-full h-full flex justify-center'>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Atualizar Dados</CardTitle>
                    <CardDescription>Atualização de dados cadastrais.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    {...register('name')}
                                />
                                {errors.name &&
                                    <p className='text-red-400'>{errors.name.message as string}</p>
                                }
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">E-mail</Label>
                                <Input
                                    readOnly
                                    {...register('email')}
                                />
                                {errors.email &&
                                    <p className='text-red-400'>{errors.email.message as string}</p>
                                }
                            </div>

                        </div>
                        <div className="mt-3 flex justify-end">
                            <Button disabled={isLoading} type="submit">
                                {isSubmitting && 'Salvando...'}
                                {!isSubmitting && 'Salvar alterações'}
                            </Button>

                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    );
};
export default ProfileForm;