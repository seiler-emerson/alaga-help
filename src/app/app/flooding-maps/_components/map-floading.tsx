"use client";

import L, { LatLngTuple } from "leaflet";
import React, { useState } from "react";
import { AttributionControl, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import "leaflet/dist/leaflet.css";
import { getNotificationById } from '@/config/api';
import { format } from 'date-fns';
import { Coordinate } from '@/types/Coordinate';
import { useTheme } from 'next-themes';

type Props = {
    coordinates: Coordinate[]
}

const ComponentResize = () => {
    const map = useMap();
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
    return null;
};

const MapFloading = ({ coordinates }: Props) => {
    const { theme } = useTheme()
    const [markerSelected, setMarkerSelected] = useState<any>()
    const centerLocation: LatLngTuple = [-26.830171106617026, -48.69609627289628];
    const zoom: number = 9
    const tiler = theme === "light" ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

    const notificationIcon = new L.Icon({
        iconUrl: "/img/map/blue_marker.svg",
        iconSize: new L.Point(10, 10)
    });

    const mapStyle = {
        height: "100%",
        width: "100%",
    };

    const handleMarkerClick = (item: {
        latitude: number
        longitude: number
        id: string
    }) => {
        let notifications = ''
        for (let index = 0; index < item.id.length; index++) {
            notifications = notifications + " " + item.id[index];
        }
        getNotification(item.id)
    };

    const getNotification = async (id: string) => {
        try {
            const notification = await getNotificationById(id)
            if (notification.status == 200) {
                const not = {
                    ...notification.data,
                    date: format(new Date(notification.data.date), 'dd/MM/yyyy')
                }
            setMarkerSelected(not);
        }

        } catch (error) {

    }
};

const createClusterCustomIcon = function (cluster: any) {
    var childCount = cluster.getChildCount();
    var c = ' marker-cluster-';
    if (childCount < 10) {
        c += 'small';
    }
    else if (childCount < 100) {
        c += 'medium';
    }
    else {
        c += 'large';
    }

    return L.divIcon({
        html: '<div><span>' + childCount + '</span></div>',
        className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)
    });
}

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
                <MarkerClusterGroup
                    chunkedLoading
                    maxClusterRadius={20}
                    iconCreateFunction={createClusterCustomIcon}
                >
                    {coordinates &&
                        coordinates.map((item, index) => (
                            <Marker
                                key={index}
                                position={[item.latitude, item.longitude]}
                                icon={notificationIcon}
                                eventHandlers={{
                                    click: () => handleMarkerClick(item),
                                }}
                            >
                                <Popup>
                                    {markerSelected ? (

                                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 rounded-e-xl rounded-es-xl ">
                                            <span className="text-sm  text-gray-900 ">Data: {markerSelected?.date}</span>
                                            <span className="text-sm  text-gray-900 ">CEP: {markerSelected?.zipcode}</span>
                                            <span className="text-sm  text-gray-900 ">Rua: {markerSelected?.street}</span>
                                            <span className="text-sm  text-gray-900 ">Bairro: {markerSelected?.district}</span>
                                            <span className="text-sm  text-gray-900 ">Cidade: {markerSelected?.city}</span>
                                            <span className="text-sm  text-gray-900 ">Estado: {markerSelected?.state}</span>
                                            <span className="text-sm  text-gray-900 ">Observações: {markerSelected?.observation}</span>

                                        </div>
                                    ): (
                                        <span className='text-sm'>Buscando detalhes...</span>
                                    )
                                    }
                                </Popup>
                            </Marker>
                        ))
                    }
                </MarkerClusterGroup>
            </MapContainer>
        }
    </>
);
};

export default MapFloading;