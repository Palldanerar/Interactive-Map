import { HistoricalEvent } from "./app/Components/MapsApp";

const eventsData: HistoricalEvent[] = [
    {
        id: 1,
        title: "Nizhny Novgorod Kremlin",
        description: `The Nizhny Novgorod Kremlin is a historical fortress in the center of Nizhny Novgorod, Russia. 
        Built in the 16th century. An architectural complex with the Transfiguration Church, the Archangel Cathedral 
        and the Palace of Peter I. Offering panoramic views of the Volga. Inside are museums that tell the rich history of 
        the region. A popular place for walking and exploring cultural heritage.`,
        position: [56.328624, 44.002842],
        category: "Building"
    },
    {
        id: 2,
        title: "GAZ plant",
        description: `The Gorky Automobile Plant (GAZ) plant in Nizhny Novgorod is one of the oldest and largest automakers in 
        Russia. It was founded in 1932 and has become one of the most important enterprises in the country's automotive industry.`,
        position: [56.250353, 43.914783],
        category: "Building"
    }
]

export default eventsData;