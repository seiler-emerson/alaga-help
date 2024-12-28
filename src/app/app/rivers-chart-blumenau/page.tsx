"use client"
import { useEffect, useState } from 'react';
import { RiverChart } from '../../../components/chart/river-chart';
import { getRiverById } from '@/config/api';
import { RiverDataGraph } from '@/types/RiverData';

export default function Page() {
  const [riverData, setRiverData] = useState<RiverDataGraph>();

  useEffect(() => {

    const fetchRiverData = async () => {
      try {
        const data = await getRiverById('01', 'blumenau')
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
          key={'itj-blue'}
          chartData={riverData}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
    </div>
  );
}
