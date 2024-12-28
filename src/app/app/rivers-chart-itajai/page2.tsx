
"use client"
import { useEffect, useState } from 'react';

import { getItajaiLevelRiver, getRiverById } from '@/config/api';

export default function Page() {

  useEffect(() => {
    const fetchRiverData = async () => {

      // const response = await getRiverById('01', 'itajai')
      const response = await getRiverById('01', 'blumenau')
      console.log(response);

    }


    fetchRiverData();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>

    </div>
  );
}
