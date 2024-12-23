'use client'

import { useEffect, useState } from 'react';
import MapFloading from './_components/map-floading';
import { getAllFlooding24h } from '@/config/api';



const Page = () => {

    const [dataMap, setDataMap] = useState<{
        latitude: number;
        longitude: number;
        id: string;
    }[]>()

    const getDataMap = async () => {
        const response = await getAllFlooding24h()
        setDataMap(response)
        console.log(response);

    };

    useEffect(() => {
        getDataMap()
    }, [])

    return (
        <div className='h-full className="z-[100]"'>
            {dataMap &&
                <MapFloading coordinates={dataMap} />
            }
        </div>
    );
};
export default Page;