"use client"

import { useState } from 'react';
import NotificationForm from './_components/form';
import { Table } from './_components/table';
import { Button } from '@/components/ui/button';
import { prisma } from '@/services/database';
import { createNewRiver } from './actions';

const Page = () => {

    const [form, setForm] = useState<boolean>(false)

    const criarRio = async () => {

        const novoRio = createNewRiver({
            name: "Rio Itajaí-Açu",
            city: "Itajaí",
            state: "SC"
        })
        data:

        console.log(novoRio);

    };

    return (
        <div className=''>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <h1 className="text-2xl font-bold mb-4">Notificações de Alagamentos</h1>
                <Button className={`${form && 'hidden'}`} onClick={() => setForm(true)}>Adicionar Alagamento</Button>
            </div>
            {!form ? (
                <Table />
            ) : (
                <NotificationForm openForm={setForm} />
            )}
            <button onClick={criarRio}>Criar rio</button>
        </div>
    );
};
export default Page;