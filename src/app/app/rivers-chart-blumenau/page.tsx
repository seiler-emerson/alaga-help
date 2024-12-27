"use client"
import { useEffect, useState } from 'react';
import { getNivelRio } from './action';
import { RiverChart } from './_components/chart';

export default function Page() {
  const [riverData, setRiverData] = useState();

  useEffect(() => {

    const fetchRiverData = async () => {
      try {
        const data = await getNivelRio()
        for (let index = 0; index < data.length; index++) {
          data[index].observation = 3
          data[index].attention = 4
          data[index].alert = 6
          data[index].maxAlert = 8
        }
        setRiverData(data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
    };
    fetchRiverData();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-1'>
      {riverData &&
        <RiverChart
          key={'itj-blue'}
          chartData={riverData}
          name={'Rio Itajaí-Açu - Blumenau - SC'}
        />
      }
    </div>
  );
}
