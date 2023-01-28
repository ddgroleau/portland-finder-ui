/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Slider, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useGetLocationsInRadius } from 'src/api';
import { Coordinates, ZOOM_IN, ZOOM_OUT } from 'src/coordinates';
import { Location } from 'src/location';
import theme from 'src/theme';
import { usePosition } from 'src/usePosition';
import LeafletMap from './LeafletMap';
import RadiusSlider from './RadiusSlider';

const MapResults = () => {
    const [showAllResults, setShowAllResults] = useState<boolean>(false);
    const {latitude, longitude, error} = usePosition();
    const [radius, setRadius] = useState<number>(10);
    const { refetch } = useGetLocationsInRadius(radius, latitude, longitude);
    const [locations, setLocations] = useState<Location[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
    const [center, setCenter] = useState<Coordinates>({
        latitude:latitude,
        longitude:longitude
    });
    const [zoom, setZoom] = useState<number>(ZOOM_OUT);
    const mapRef = useRef<null | HTMLDivElement>(null);
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const hasLocations = locations && locations.length > 0;

    const handleLocationTextClick = (coordinates:Coordinates) => {
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
        setZoom(ZOOM_OUT - (radius/10));
        setCenter({latitude:latitude,longitude:longitude});

        if(debounceTimeout) clearTimeout(debounceTimeout);
        setDebounceTimeout(setTimeout(()=> 
            refetch().then(newLocations => {
                if(newLocations.data)
                    setLocations(newLocations.data);
            }),
        700));
    },[latitude,longitude,radius]);

    return (
        <Box sx={{ paddingBlock: "1rem 2rem" }}>
            <span dangerouslySetInnerHTML={{__html: error}}></span>
            <Box sx={{ display: "flex", flexFlow:"row wrap", gap: "2rem", marginBlock: "1rem 2rem", }}>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={!isDesktop ? { minWidth: "9rem" } : { marginRight: "1rem", marginLeft: "0"}}
                    onClick={handleScrollBtnClick}
                >
                    Scroll to map
                </Button>
                {hasLocations && 
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    style={!isDesktop ? { minWidth: "9rem" } : { marginRight: "1rem", marginLeft: "0" }}
                    onClick={handleToggleShowAllResults}
                >
                    {!showAllResults ? "Show all locations" : "Show Top 5 locations"}
                </Button>
                }
            </Box>
            <Box display={"flex"} flexDirection={!isDesktop ? "column" : "row"} gap="5vw" marginBottom="2rem">
                <RadiusSlider radius={radius} setRadius={setRadius} />
                { !hasLocations ? 
                    <Typography variant={"h3"} sx={{ marginBottom: "2rem" }}>
                        No locations found in your selected radius.
                    </Typography> :
                    <Box width="100%">
                        <Typography variant={"h3"}>
                            <u>
                                {!showAllResults ? 
                                    "Closest 5 locations" : `All ${locations.length} locations in radius` } 
                            </u>
                        </Typography>
                        <ol style={{ marginBottom: "2rem" }}>
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
                }
            </Box>
            <div ref={mapRef} key={center.latitude}>
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