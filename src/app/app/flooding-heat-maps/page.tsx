'use client'

import { useEffect, useState } from 'react';
import MapFloading from './_components/map-floading';
import { getAllFlooding24h } from '@/config/api';

const Page = () => {

    const [dataMap, setDataMap] = useState<number[][]>()

    const getDataMap = async () => {
        const response = await getAllFlooding24h()
        if(response){
            let coordinate = []
            for (let index = 0; index < response.length; index++) {
                coordinate.push([response[index].latitude, response[index].longitude])
            }
            setDataMap(coordinate)
        }
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