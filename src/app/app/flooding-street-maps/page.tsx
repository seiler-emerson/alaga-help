'use client'

import { useEffect, useState } from 'react';
import MapFloading from './_components/map-floading';
import { getAllStreetFlooding24 } from '@/config/api';



const Page = () => {

    const [dataMap, setDataMap] = useState<any[]>()

    const multipleBounds = [
        [-26.8891248, -26.8913825, -48.696304, -48.6965816],
        [-26.8913825, -26.8966299, -48.6965816, -48.6968641]
      ];
      
    const getDataMap = async () => {
        const response = await getAllStreetFlooding24()
        setDataMap(response)
    };

    useEffect(() => {
        getDataMap()
    }, [])
    

    return (
        <div className='h-full className="z-[100]"'>
            {dataMap &&
                <MapFloading coordinates={dataMap} bounds={dataMap}/>
            }
        </div>
    );
};
export default Page;