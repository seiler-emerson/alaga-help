"use client"
import { useEffect, useState } from 'react';
import { getNivelRio } from './action';
import { RiverChart } from './_components/chart';

export default function Page() {
  const [riverData, setRiverData] = useState<any>();



  useEffect(() => {



    const fetchRiverData = async () => {
      try {
        const data = await getNivelRio()
        data[23].nivel = 7
        console.log(data)
        setRiverData(data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
    };

    fetchRiverData();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-1'>
      <RiverChart
        key={'itj-blue'}
        chartData={riverData}
        name={'Rio Itajaí-Açu - Blumenau - SC'}
      />
    </div>
  );
}
