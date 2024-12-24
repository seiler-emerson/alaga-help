"use client";

import { LatLngTuple } from "leaflet";
import React from "react";
import { AttributionControl, MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'next-themes';
import HeatmapLayerFactory from './HeatmapLayer';
const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>()

type Props = {
    coordinates: any[]
}

const ComponentResize = () => {
    const map = useMap();
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
    return null;
};
console.log(HeatmapLayer); // Deve exibir uma função ou classe. Se for `undefined`, a importação está errada.

const MapFloading = ({ coordinates }: Props) => {


    const transform = (bounds: any[]): any[] => {
        return bounds.map(bound => [
            [bound.latitude, bound.longitude]
        ]);
    };

    const { theme } = useTheme()
    const centerLocation: LatLngTuple = [-26.830171106617026, -48.69609627289628];
    const zoom: number = 9
    const tiler = theme === "light" ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"


    const mapStyle = {
        height: "100%",
        width: "100%",
    };

    return (
        <>
            {(typeof window !== 'undefined') &&
                <MapContainer center={centerLocation} zoom={zoom} scrollWheelZoom={true} style={mapStyle} attributionControl={false}>
                    <ComponentResize />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={tiler}
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                    <AttributionControl position="bottomright" prefix={false} />

                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={coordinates}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={(m: any) => parseFloat(m[5])}
                    />

                </MapContainer>


            }
        </>
    );
};

export default MapFloading;