"use client"

import { useState } from 'react';
import NotificationForm from './_components/form';
import { Table } from './_components/table';
import { Button } from '@/components/ui/button';

const Page = () => {

    const [form, setForm] = useState<boolean>(false)

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
        </div>
    );
};
export default Page;