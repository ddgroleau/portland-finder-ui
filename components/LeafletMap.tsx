import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Coordinates } from 'src/coordinates';
import { Location } from 'src/location';

type LeafletMapProps = {
    mapHeight:string
    mapWidth:string
    coordinates:Coordinates
    locations: Location[]
    center:Coordinates
    zoom:number
    setCenter:Dispatch<SetStateAction<Coordinates>>
    setZoom:Dispatch<SetStateAction<number>>
    popUpRef:any
}

const LeafletMap = ({
    mapHeight, 
    mapWidth, 
    coordinates, 
    locations, 
    center, 
    zoom, 
    setCenter, 
    setZoom,
    popUpRef
}:LeafletMapProps) => {
    const [leaflet, setLeaflet] = useState<any>(null);

    useEffect(() => {
        if(!leaflet && typeof window !== undefined) {
            import('react-leaflet').then(data => {
                setLeaflet(data);
            });
        }
        setCenter(coordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[leaflet]);

    const handleMarkerClick = (coordinates:Coordinates) => {
        setCenter(coordinates);
        setZoom(18);
    };

    return (
        <section key={center.latitude}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                crossOrigin=""/>
            {(!leaflet || !leaflet.MapContainer) ? undefined :
                <leaflet.MapContainer 
                    center={[center.latitude, center.longitude]} 
                    zoom={zoom} 
                    scrollWheelZoom={false} 
                    style={{ height: mapHeight, width: mapWidth }}>
                    <leaflet.TileLayer
                        attribution='
                        &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <leaflet.Marker 
                        eventHandlers={{doubleClick: ()=>handleMarkerClick(coordinates) }} 
                        position={[coordinates.latitude, coordinates.longitude]}
                    >
                        <leaflet.Popup>
                            You are here!
                        </leaflet.Popup>
                    </leaflet.Marker>
                    {!locations || locations.length <= 0 ? undefined :
                        locations.map((location:Location,index:number) => {
                            return (
                                <leaflet.Marker 
                                    key={index} 
                                    eventHandlers={{doubleClick: ()=>handleMarkerClick(location) }} 
                                    position={[location.latitude, location.longitude]}
                                >
                                    <leaflet.Popup ref={popUpRef}>
                                        <strong><u>{location.name}</u></strong><br/>
                                        {location.streetAddress}<br/>
                                        {location.city}, {location.state} {location.zipCode}<br/>
                                        <Link href={location.directionsUri} target="_blank">Directions</Link>
                                            &nbsp;|&nbsp;
                                        <Link href={`tel:${location.phone}`} target="_blank">Call</Link>
                                    </leaflet.Popup>
                                </leaflet.Marker>
                            );
                        })
                    }
                </leaflet.MapContainer>}
        </section>
    );
       

};

export default LeafletMap;