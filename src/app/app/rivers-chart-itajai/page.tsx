interface RiverMeasurement {
  datahora: string;
  rio: number;
  chuva: number;
  chuva01: number;
  chuva06: number;
  chuva12: number;
  chuva24: number;
  chuva48: number;
}

interface RiverLevels {
  measurements: RiverMeasurement[];
  attention: number;
  alert: number;
  emergency: number;
}

interface RiverData {
  [key: string]: RiverLevels;
}

"use client"
import { useEffect, useState } from 'react';
import { itajaiRiversData } from '@/data/data';
import { RiverChart } from './_components/chart';
import { getItajaiLevelRiver } from '@/config/api';

export default function Page() {
  const [riverData, setRiverData] = useState<RiverData>({});

  useEffect(() => {
    const fetchRiverData = async () => {
      try {
        const promises = itajaiRiversData.map(river =>
          getItajaiLevelRiver(river.id).then(response => ({
            id: river.id,
            data: {
              measurements: response.data.map((measurement: any) => ({
                ...measurement,
                current: measurement.rio,
                attention: river.attention,
                alert: river.alert,
                emergency: river.emergency
              }))
            }
          }))
        );

        const results = await Promise.all(promises);
        const newData = results.reduce((acc, { id, data }) => ({
          ...acc,
          [id]: data
        }), {});

        setRiverData(newData);
      } catch (error) {
        console.error('Erro ao buscar dados dos rios:', error);
      }
    };

    fetchRiverData();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      {itajaiRiversData.map((river) => {
        const measurements = riverData[river.id]?.measurements;

        return measurements && measurements.length > 0 ? (
          <RiverChart
            key={river.id}
            chartData={measurements}
            name={river.name}
          />
        ) : (
          <p key={river.id}>Carregando {river.name}</p>
        );
      })}
    </div>
  );
}
