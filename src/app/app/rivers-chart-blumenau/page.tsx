"use client"
import { useEffect, useState } from 'react';
import { RiverChart } from '../../../components/chart/river-chart';
import { getRiverByExternalApi, getRiverById } from '@/config/api';
import { RiverDataGraph } from '@/types/RiverData';

export default function Page() {
  const [riverData, setRiverData] = useState<RiverDataGraph>();

  useEffect(() => {

    const fetchRiverData = async () => {
      try {
        // const data = await getRiverByExternalApi('01', 'blumenau')
        const data = await getRiverById('1601b4e2-b02e-4cb4-b165-1b529a145a29')
        setRiverData(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
    };
    fetchRiverData();
  }, []);

  return (
    <div suppressHydrationWarning className='grid grid-cols-1 lg:grid-cols-1'>
      {riverData ? (
        <RiverChart
          key={'itj-blu'}
          chartData={riverData}
        />
      ) : (
        <div>Carregando Gráfico...</div>
      )}
    </div>
  );
}
