"use client";

import L, { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import { searchBoundingbox } from '../actions';

type Props = {
    position: LatLngTuple
    setCoordinates: (coordinates: { latitude: number, longitude: number, limits: any[] }) => void
}

const ComponentResize = () => {
    const map = useMap();

    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    return null;
};

export const MapForm = ({ position, setCoordinates }: Props) => {

    const zoom: number = 13
    // const tiler = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiler = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    const markerIcon = new L.Icon({
        iconUrl: "/img/map/location.svg",
        iconSize: new L.Point(50, 50)
    });
    const mapStyle = {
        height: "100%",
        width: "100%",
    };

    const SetViewOnClick = ({ position }: Props) => {
        const map = useMap();
        map.setView(position, map.getZoom());

        return null;
    };

    const getBoundingbox = async (latitude: number, longitude: number) => {
        const boundingbox = await searchBoundingbox(latitude, longitude);
        return boundingbox.boundingbox

    };
    const updateMarkerCoordinates = async (event: L.DragEndEvent) => {
        const newPosition: LatLngTuple = [event.target.getLatLng().lat, event.target.getLatLng().lng];
        let boundingbox = await getBoundingbox(event.target.getLatLng().lat, event.target.getLatLng().lng)

        if (boundingbox) {
            
            let coordinate = {
                latitude: newPosition[0],
                longitude: newPosition[1],
                limits: boundingbox
            }
            setCoordinates(coordinate)
        }
    };

    return (
        <>
            {(typeof window !== 'undefined') &&

                <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={mapStyle} attributionControl={false}>
                    <TileLayer
                        url={tiler}
                        maxNativeZoom={19}
                        maxZoom={22}
                    />
                    <Marker
                        position={position}
                        icon={markerIcon}
                        draggable={true}
                        eventHandlers={{
                            dragend: updateMarkerCoordinates,
                        }}
                    >
                    </Marker>
                    <ComponentResize />
                    <SetViewOnClick position={position} setCoordinates={setCoordinates} />
                </MapContainer>
            }
        </>
    );
};