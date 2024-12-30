"use client"
import { useEffect, useState } from 'react';
import { RiverChart } from '../../../components/chart/river-chart';
import { getRiverById } from '@/config/api';
import { RiverDataGraph } from '@/types/RiverData';

export default function Page() {
  const [riverData1, setRiverData1] = useState<RiverDataGraph>();
  const [riverData2, setRiverData2] = useState<RiverDataGraph>();
  const [riverData3, setRiverData3] = useState<RiverDataGraph>();
  const [riverData4, setRiverData4] = useState<RiverDataGraph>();
  const [riverData5, setRiverData5] = useState<RiverDataGraph>();
  const [riverData6, setRiverData6] = useState<RiverDataGraph>();
  const [riverData7, setRiverData7] = useState<RiverDataGraph>();
  const [riverData8, setRiverData8] = useState<RiverDataGraph>();
  const [riverData9, setRiverData9] = useState<RiverDataGraph>();

  useEffect(() => {

    const fetchRiverData = async () => {
      try {
        const data = await getRiverById('84330712-9dfd-4234-88e7-d88371d618db')
        setRiverData1(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('75ed5a52-41e0-4b59-9785-28360f137be9')
        setRiverData2(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('157483ba-f5ed-4858-9c05-04a7995c045a')
        setRiverData3(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('bd1905ba-46a6-498e-88ee-03e5ff38947e')
        setRiverData4(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('f4423ad0-4414-4fff-bfd7-691bcbf26f47')
        setRiverData5(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('3af3f0da-1fb2-4278-8025-6fc37ce2dd57')
        setRiverData6(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('fb1e5f8e-11da-4bfe-aaf8-dfa17cc775c0')
        setRiverData7(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('a0df2c2b-ea31-453d-8be9-194e705255ff')
        setRiverData8(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('6444b68e-e0a6-4c44-a630-fa5155d3562c')
        setRiverData9(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
    };
    fetchRiverData();
  }, []);

  return (
    <div suppressHydrationWarning className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      {riverData1 ? (
        <RiverChart
          key={'itj-1'}
          chartData={riverData1}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData2 ? (
        <RiverChart
          key={'itj-2'}
          chartData={riverData2}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData3 ? (
        <RiverChart
          key={'itj-3'}
          chartData={riverData3}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData4 ? (
        <RiverChart
          key={'itj-4'}
          chartData={riverData4}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData5 ? (
        <RiverChart
          key={'itj-5'}
          chartData={riverData5}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData6 ? (
        <RiverChart
          key={'itj-6'}
          chartData={riverData6}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData7 ? (
        <RiverChart
          key={'itj-7'}
          chartData={riverData7}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData8 ? (
        <RiverChart
          key={'itj-8'}
          chartData={riverData8}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
      {riverData9 ? (
        <RiverChart
          key={'itj-9'}
          chartData={riverData9}
        />
      ) : (
        <div>Carregando Gráfico...</div> // Fallback consistente
      )}
    </div>
  );
}
