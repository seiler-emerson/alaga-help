"use client";

import { useState } from 'react';

export const MapForm = () => {

    const [newCoordinates, setNewCoordinates] = useState<number[]>()
    const zoom: number = 13
    const tiler = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const markerIcon = new L.Icon({
      iconUrl: "/img/map/location.svg",
      iconSize: new L.Point(50, 50)
    });
    const mapStyle = {
      height: "100%", // Defina a altura desejada do mapa aqui
      width: "100%",   // Pode ajustar a largura conforme necessário
    };
    return(
        <div className='bg-red-600'>
            
        </div>
     );
};