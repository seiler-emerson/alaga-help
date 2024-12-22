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
import { createFloodingNotificationSchema } from '../schema'

import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/use-debounce'
import { searchAddress } from '../actions'
import { parse, format } from 'date-fns';
import { MapForm } from '@/components/maps/map-form'

const NotificationForm = () => {

    const router = useRouter()
    type createFloodingNotificationObject = z.infer<typeof createFloodingNotificationSchema>

    const { handleSubmit, register, formState: { errors, isSubmitting, isLoading }, control, setValue } = useForm<createFloodingNotificationObject>({
        resolver: zodResolver(createFloodingNotificationSchema),
        defaultValues: {
            date: format(new Date(), 'dd/MM/yyyy'),

        },
    })

    const [cepInput, setCepInput] = useState('');
    const [addressNumberInput, setAddressNumberInput] = useState('');
    const debouncedCep = useDebounce(cepInput, 500);

    useEffect(() => {
        const fetchAddress = async () => {
            if (debouncedCep.length === 8) {
                try {
                    const address = await searchAddress(debouncedCep);
                    setValue('street', address.street || '');
                    setValue('complement', address.complement || '');
                    setValue('city', address.city || '');
                } catch (err) {
                    console.error('Erro ao buscar o endereço:', err);
                }
            }
        };

        fetchAddress();
    }, [debouncedCep, setValue]);

    const handleSubmitForm = async (data: createFloodingNotificationObject) => {
        try {
            const formattedDate = parse(data.date, 'dd/MM/yyyy', new Date());
            const dateForDatabase = format(formattedDate, 'yyyy-MM-dd');

            const payload = {
                ...data,
                date: dateForDatabase,
            };

            console.log(payload)
            // router.refresh()

            // toast({
            //     title: 'Sucesso',
            //     description: 'Seu perfil foi atualizado com sucesso.',
            // })
        } catch (error) {
            // toast({
            //     title: 'Erro!',
            //     description: 'Ocorreu um erro, tente novamente!'
            // })
        }
    }

    return (
        <div className='w-full h-full flex justify-center'>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Notificação de Alagamento</CardTitle>
                    <CardDescription>Cadastro de ponto de alagamento.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleSubmitForm)} >
                        <div className='grid grid-cols-1 lg:grid-cols-2'>

                            <div className="grid w-full items-center gap-4">

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Data</Label>
                                        <Input
                                            readOnly
                                            {...register('date')}
                                        />
                                        {errors.date &&
                                            <p className='text-red-400'>{errors.date.message as string}</p>
                                        }
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="zipcode">CEP</Label>
                                        <Input
                                            {...register('zipcode', { valueAsNumber: true })}
                                            onChange={(e) => setCepInput(e.target.value.replace(/\D/g, ''))}
                                            value={cepInput}
                                            placeholder="Digite seu CEP"
                                        />
                                        {errors.zipcode &&
                                            <p className='text-red-400'>{errors.zipcode.message as string}</p>
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
                                    <div className='lg:col-span-5'>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Rua*</Label>
                                            <Input
                                                {...register('street')}
                                            />
                                            {errors.street &&
                                                <p className='text-red-400'>{errors.street.message as string}</p>
                                            }
                                        </div>

                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Número</Label>
                                        <Input
                                            {...register('addressNumber', { valueAsNumber: true })}
                                            onChange={(e) => setAddressNumberInput(e.target.value.replace(/\D/g, ''))}
                                            value={addressNumberInput}
                                        />
                                        {errors.addressNumber &&
                                            <p className='text-red-400'>{errors.addressNumber.message as string}</p>
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Bairro*</Label>
                                        <Input
                                            {...register('district')}
                                        />
                                        {errors.district &&
                                            <p className='text-red-400'>{errors.district.message as string}</p>
                                        }
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Cidade*</Label>
                                        <Input
                                            {...register('city')}
                                        />
                                        {errors.city &&
                                            <p className='text-red-400'>{errors.city.message as string}</p>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Complemento</Label>
                                    <Input
                                        {...register('complement')}
                                    />
                                    {errors.complement &&
                                        <p className='text-red-400'>{errors.complement.message as string}</p>
                                    }
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Observações</Label>
                                    <Input
                                        {...register('observation')}
                                    />
                                    {errors.observation &&
                                        <p className='text-red-400'>{errors.observation.message as string}</p>
                                    }
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Latitude*</Label>
                                        <Input
                                            readOnly
                                            {...register('latitude')}
                                        />
                                        {errors.latitude &&
                                            <p className='text-red-400'>{errors.latitude.message as string}</p>
                                        }
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Longitude*</Label>
                                        <Input
                                            {...register('longitude')}
                                        />
                                        {errors.longitude &&
                                            <p className='text-red-400'>{errors.longitude.message as string}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <MapForm />
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
export default NotificationForm;