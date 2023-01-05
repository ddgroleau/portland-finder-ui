import { Box, Button, Slider, Typography } from '@mui/material';
import { Popup } from 'leaflet';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useGetLocationsInRadius } from 'src/api';
import { Coordinates, ZOOM_IN, ZOOM_OUT } from 'src/coordinates';
import { Location } from 'src/location';
import theme from 'src/theme';
import LeafletMap from './LeafletMap';

const MapResults = ({latitude,longitude}:Coordinates) => {
    const [radius, setRadius] = useState<number>(10);
    const { data, refetch, isRefetching } = useGetLocationsInRadius(radius, latitude, longitude);
    const [locations, setLocations] = useState<Location[]>([]);
    const [center, setCenter] = useState<Coordinates>({
        latitude:latitude,
        longitude:longitude
    });
    const [zoom, setZoom] = useState<number>(ZOOM_OUT);
    const mapRef = useRef<null | HTMLDivElement>(null);

    const handleLocationTextClick = (coordinates:Coordinates) => {
        setCenter(coordinates);
        setZoom(ZOOM_IN);
        if(mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollBtnClick = () => {
        if(mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
        } 
    };

    useEffect(()=> {
        refetch().then(newLocations => {
            if(newLocations.data)
                setLocations(newLocations.data);
        });
    },[latitude,longitude,radius,refetch]);
    return (
        <Box sx={{ paddingBlock: "1rem 2rem" }}>
            <Typography variant={"h3"}>Showing locations within {radius} miles.</Typography>
            <Box sx={{ maxWidth: "16rem" }}>
                <label htmlFor="slider">Use the slider to change your search radius:</label>
                <Slider
                    id="slider" 
                    value={radius} 
                    color={"secondary"} 
                    valueLabelDisplay="auto" 
                    style={{ marginTop: "0.5rem" }}
                    step={1}
                    min={1}
                    max={100}
                    onChange={(event:any)=>setRadius(event?.target.value)}
                />
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={{ marginBlock: "1rem 1rem"}}
                    onClick={handleScrollBtnClick}
                >
                    Scroll to map
                </Button>
            </Box>
            <Typography variant={"h4"}><u>Closest 5 Locations:</u></Typography>
            <ol>
                {!locations || locations.length <= 0 ? undefined :
                    locations.slice(0,5).map((location:any,index:number)=> {
                        return (
                            <li key={index}>
                                <button 
                                    style={{
                                        border:"none",
                                        cursor:"pointer",
                                        background:"none",
                                        fontSize:theme.typography.htmlFontSize,
                                        color:theme.palette.secondary.main,
                                        textDecoration: "underline"
                                    }}
                                    onClick={()=>handleLocationTextClick(
                                        { latitude:location.latitude,longitude:location.longitude }
                                    )}
                                >
                                    {location.name}
                                </button>
                                &nbsp;- {location.distance} mile(s) away -&nbsp;
                                <Link href={location.directionsUri} target="_blank">Get Directions</Link>
                            </li>
                        );
                    })}
            </ol>
            <div ref={mapRef}>
                <LeafletMap 
                    mapHeight={"80vh"}
                    mapWidth={"100%"}
                    coordinates={{
                        latitude:latitude,
                        longitude:longitude
                    }}
                    locations={locations}
                    center={center}
                    zoom={zoom}
                    setCenter={setCenter}
                    setZoom={setZoom}
                />
            </div>
        </Box>
    );
       
};

export default MapResults;