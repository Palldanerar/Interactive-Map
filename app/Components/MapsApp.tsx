import React, { useState } from 'react'

import 'leaflet/dist/leaflet.css';
//@ts-ignore
import { Icon } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import eventsData from "@/historyEvents";
import FlyToMarker from './FyToMarker';
import Filter from './Filter';

const startPosition: [number, number] = [ 55.751999,37.617734]
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

    const [favourites, setFavourites] = useState<number[]>(() => {
        const savedFavourites = localStorage.getItem("favourites")
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    })
    const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleFavouriteClick = (eventId: number) => {
        let updatedFavourites = favourites.filter((id) => id !== eventId);

        if (!favourites.includes(eventId)) {
            updatedFavourites = [eventId, ...updatedFavourites];
        }

        setFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    };

    const handleListItemClick = (eventId: number) => {

        const event = eventsData.find((event) => event.id === eventId);

        if (event) {
            setActiveEvent(event);
        }
    };

    return (
        <div className="content">
            <div className="map-content flex flex-col gap-6 h-full">
                <Filter setSelectedCategory={setSelectedCategory} />
                {/*@ts-ignore*/}
                <MapContainer center={startPosition} className="map-container" zoom={13} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {eventsData
                        .filter(
                            (event) =>
                                !selectedCategory || event.category === selectedCategory
                        )
                        .map((event) => {
                            return (
                                //@ts-ignore
                                <Marker key={event.id} position={event.position} icon={icon}
                                    eventHandlers={{
                                        click: () => {
                                            setActiveEvent(event);
                                        },
                                    }}
                                />
                            );
                        })}
                    {activeEvent && (
                        <Popup position={activeEvent.position}>
                            <div className="popup-inner">
                                <h2 className="popup-inner__title">{activeEvent.title}</h2>
                            </div>
                            <p className="popup-inner__description">
                                {activeEvent.description}
                            </p>
                            <button
                                className="popup-inner__button"
                                onClick={() => handleFavouriteClick(activeEvent.id)}
                            >
                                {favourites.includes(activeEvent.id) ? (
                                    <span>{fullStar} Unfavourite</span>
                                ) : (
                                    <span>{emptyStar} Favourite</span>
                                )}
                            </button>
                        </Popup>
                    )}

                    {activeEvent && (
                        <FlyToMarker position={activeEvent.position} zoomLevel={15} />
                    )}
                </MapContainer>
            </div>

            <div className="liked-events">
                <h2 className="liked-events__title">
                    <i className="fa-solid fa-star"></i> Favourite Events
                </h2>
                <ul>
                    {favourites
                        .map((id) => {
                            return eventsData.find((event) => event.id === id);
                        })
                        .map((event) => {
                            return (
                                <li key={event?.id} className="liked-events__event"
                                    onClick={() => {
                                        handleListItemClick(event?.id as number);
                                    }}
                                >
                                    <h3>{event?.title}</h3>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default MapsApp