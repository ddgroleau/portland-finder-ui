import React, { useEffect, useState } from 'react';
import { Coordinates } from 'src/coordinates';
import { usePosition } from 'src/usePosition';

type LeafletMapProps = {
    mapHeight:string
    mapWidth:string
    coordinates:Coordinates
}

const LeafletMap = ({mapHeight, mapWidth, coordinates}:LeafletMapProps) => {
    const [leaflet, setLeaflet] = useState<any>(null);

    useEffect(() => {
        if(!leaflet && typeof window !== undefined) {
            import('react-leaflet').then(data => {
                setLeaflet(data);
            });
        }
    },[leaflet]);

    return (
        <section key={coordinates.latitude}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                crossOrigin=""/>
            {(!leaflet || !leaflet.MapContainer) ? undefined :
                <leaflet.MapContainer 
                    center={[coordinates.latitude, coordinates.longitude]} 
                    zoom={15} 
                    scrollWheelZoom={false} 
                    style={{ height: mapHeight, width: mapWidth }}>
                    <leaflet.TileLayer
                        attribution='
                        &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <leaflet.Marker style={{background:"red"}} position={[coordinates.latitude, coordinates.longitude]}>
                        <leaflet.Popup>
                            You are here!
                        </leaflet.Popup>
                    </leaflet.Marker>
                </leaflet.MapContainer>}
        </section>
    );
       

};

export default LeafletMap;