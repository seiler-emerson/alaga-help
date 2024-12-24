"use client"
import { useEffect, useState } from 'react';
import { RiverChart } from './_components/bar-chart';
import { getItajaiRiver1 } from '@/config/api';

export default function Page() {

  const [chartData, setChartData] = useState([])

  const getData = async () => {
      const response = await getItajaiRiver1()
      setChartData(response.data)
  };

  useEffect(()=>{
      getData()
  },[])
  
    return (
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        <RiverChart chartData={chartData} name={'Rio Itajaí-Açu - ICMBio/CEPSUL'}/>
        <RiverChart chartData={chartData} name={'Rio Itajaí-Açu - Praça Celso Pereira da Silva'}/>
        <RiverChart chartData={chartData} name={'Rio Itajaí­-Mirim (canal retificado) - Captação SEMASA'}/>
        <RiverChart chartData={chartData} name={'Rio Itajaí­-Mirim (canal retificado e curso antigo) - Vitalmar Pescados'}/>
        <RiverChart chartData={chartData} name={'Rio Itajaí­-Rio Itajaí-­Mirim (curso antigo) - Propriedade privada'}/>
        <RiverChart chartData={chartData} name={'Rio Itajaí-­Mirim (curso antigo) - Itamirim Clube de Campo'}/>
        <RiverChart chartData={chartData} name={'Ribeirão da Murta - Portal'}/>
        <RiverChart chartData={chartData} name={'Ribeirão Canhanduba - Propriedade privada'}/>
        <RiverChart chartData={chartData} name={'Ribeirão da Murta - Ponte da Rua Lidia Puel Peixer'}/>
      </div>
    )
}
