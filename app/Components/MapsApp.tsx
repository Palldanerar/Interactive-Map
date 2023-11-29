import React from 'react'

import 'leaflet/dist/leaflet.css';
//@ts-ignore
import { Icon } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import eventsData from "@/historyEvents";

const position: [number, number] = [56.328624, 44.002842]
const emptyStar = <i className="fa-regular fa-star"></i>;
const fullStar = (
  <i
    className="fa-solid fa-star"
    style={{
      color: "#fdc401",
    }}
  ></i>
);

export interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    position: [number, number];
    category: string;
}

const MapsApp = () => {

    const icon: Icon = new Icon({
        iconUrl: "marker.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div className="content">
            <div className="map-content flex flex-col gap-6 h-full">
                <div className="h-12 text-white">ds</div>
                {/*@ts-ignore*/}
                <MapContainer center={position} className="map-container" zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {eventsData.map((event: HistoricalEvent) => {
                        return (
                            /*@ts-ignore*/
                            <Marker key={event.id} position={event.position} icon={icon}>
                                <Popup >
                                    <div className="popup-inner">
                                        <h2 className="popup-inner__title">{event.title}</h2>
                                    </div>
                                    <p className="popup-inner__description">
                                        {event.description}
                                    </p>
                                    <button className='popup-inner__button'>{emptyStar} Add</button>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    )
}

export default MapsApp