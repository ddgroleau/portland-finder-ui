import { Box, Button, Grid, Slider, Typography, useMediaQuery } from '@mui/material';
import { Popup } from 'leaflet';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useGetLocationsInRadius } from 'src/api';
import { Coordinates, ZOOM_IN, ZOOM_OUT } from 'src/coordinates';
import { Location } from 'src/location';
import theme from 'src/theme';
import { usePosition } from 'src/usePosition';
import LeafletMap from './LeafletMap';

const MapResults = () => {
    const [showAllResults, setShowAllResults] = useState<boolean>(false);
    const {latitude, longitude, error} = usePosition();
    const [radius, setRadius] = useState<number>(10);
    const { data, refetch, isRefetching } = useGetLocationsInRadius(radius, latitude, longitude);
    const [locations, setLocations] = useState<Location[]>([]);
    const [center, setCenter] = useState<Coordinates>({
        latitude:latitude,
        longitude:longitude
    });
    const [zoom, setZoom] = useState<number>(ZOOM_OUT);
    const mapRef = useRef<null | HTMLDivElement>(null);
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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

    const handleToggleShowAllResults = () => setShowAllResults(!showAllResults);

    useEffect(()=> {
        refetch().then(newLocations => {
            if(newLocations.data)
                setLocations(newLocations.data);
        });
    },[latitude,longitude,radius,refetch]);

    return (
        <Box key={latitude} sx={{ paddingBlock: "1rem 2rem" }}>
            <Box sx={{ display: "flex", flexFlow:"row wrap", gap: "2rem", marginBlock: "1rem 2rem", }}>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={!isDesktop ? { minWidth: "9rem" } : { marginRight: "1rem", marginLeft: "0"}}
                    onClick={handleScrollBtnClick}
                >
                    Scroll to map
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={!isDesktop ? { minWidth: "9rem" } : { marginRight: "1rem", marginLeft: "0" }}
                    onClick={handleToggleShowAllResults}
                >
                    {!showAllResults ? "Show all locations" : "Show Top 5 locations"}
                </Button>
            </Box>
            <Box display={"flex"} flexDirection={!isDesktop ? "column" : "row"} gap="5vw" marginBottom="2rem">
                <Box>
                    <Typography variant={"h3"}>
                        <u>
                            {!showAllResults ? 
                                "Closest 5 locations" : `All ${locations.length - 1} locations in radius` } 
                        </u>
                    </Typography>
                    <ol>
                        {!locations || locations.length <= 0 ? undefined :
                            locations.map((location:any,index:number)=> {
                                return (
                                    <li 
                                        key={index} 
                                        style={{ 
                                            marginBlock: index !== 0 ? "1rem" : "0 1rem", 
                                            display: !showAllResults && index >= 5 ? "none" : "list-item" ,
                                            textIndent: "-1rem",
                                            paddingLeft: "1rem"
                                        }}
                                    >
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
                                        <Link 
                                            href={location.directionsUri} 
                                            target="_blank" 
                                            style={{color:theme.palette.secondary.main}}
                                        >
                                            Get Directions
                                        </Link>
                                    </li>
                                );
                            })}
                    </ol>
                </Box>
                <Box>
                    <Typography variant={"h3"}><u>Showing locations within {radius} miles</u></Typography>
                    <Box sx={{ maxWidth: "16rem" }}>
                        <label htmlFor="slider">
                            <Typography variant={"h4"} padding="1rem 0 0.5rem 0">
                                Use the slider to change your search radius:
                            </Typography>
                        </label>
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
                    </Box>
                </Box>
            </Box>
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