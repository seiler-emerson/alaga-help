"use client";

import L, { LatLngBoundsExpression, LatLngTuple } from "leaflet";
import React, { useState } from "react";
import { AttributionControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet/dist/leaflet.css';
import { Coordinate } from '@/types/Coordinate';
import { useTheme } from 'next-themes';

type Props = {
    coordinates: Coordinate[]
    bounds?: number[][];
}

const ComponentResize = () => {
    const map = useMap();
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
    return null;
};

const MapFloading = ({ coordinates, bounds }: Props) => {
    const { theme } = useTheme()
    const centerLocation: LatLngTuple = [-26.830171106617026, -48.69609627289628];
    const zoom: number = 9
    const tiler = theme === "light" ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

    const iconurl = "/img/map/location.svg"


    const mapStyle = {
        height: "100%",
        width: "100%",
    };

    const boundStyle = {
        color: '#0017ff',
        weight: 1,
        opacity: 0.6,
        fillOpacity: 0.5
    };

    const transformBounds = (bounds: any[]): LatLngBoundsExpression[] => {
        return bounds.map(bound => [
            [bound.limitLatStart, bound.limitLonStart], // southWest
            [bound.limitLatEnd, bound.limitLonEnd]      // northEast
        ]);
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


                    {bounds && bounds.map((bound, index) => (
                        <Rectangle
                            key={index}
                            bounds={transformBounds([bound])[0]}
                            pathOptions={boundStyle}
                        />
                    ))}


                </MapContainer>


            }
        </>
    );
};

export default MapFloading;