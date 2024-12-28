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
        const data = await getRiverById('01', 'itajai')
        setRiverData1(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('02', 'itajai')
        setRiverData2(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('03', 'itajai')
        setRiverData3(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('04', 'itajai')
        setRiverData4(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('05', 'itajai')
        setRiverData5(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('06', 'itajai')
        setRiverData6(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('07', 'itajai')
        setRiverData7(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('08', 'itajai')
        setRiverData8(data.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
      try {
        const data = await getRiverById('09', 'itajai')
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
