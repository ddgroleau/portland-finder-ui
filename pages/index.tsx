import Layout from '@/components/Layout';
import LeafletMap from '@/components/LeafletMap';
import { Container, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import { Popup } from 'leaflet';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useGetLocationsInRadius } from 'src/api';
import { Coordinates } from 'src/coordinates';
import { Location } from 'src/location';
import theme from 'src/theme';
import { usePosition } from 'src/usePosition';

const Home = () => {
    const {latitude, longitude, error} = usePosition();
    const [radius, setRadius] = useState<number>(10);
    const { data, refetch, isRefetching } = useGetLocationsInRadius(radius, latitude, longitude);
    const [locations, setLocations] = useState<Location[]>([]);
    const [center, setCenter] = useState<Coordinates>({
        latitude:latitude,
        longitude:longitude
    });
    const [zoom, setZoom] = useState<number>(15);
    const popUpRef = useRef();
    const mapRef = useRef<null | HTMLDivElement>(null);

    const handleLocationTextClick = (coordinates:Coordinates) => {
        setCenter(coordinates);
        setZoom(18);
        if(mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
            // (popUpRef.current as unknown as Popup).openPopup();
        }
    };

    useEffect(()=> {
        refetch().then(newLocations => {
            if(newLocations.data)
                setLocations(newLocations.data);
        });
    },[latitude,longitude,radius,refetch]);

    return (
        <Layout title="Find Purple Trash Bags 🚮" description='Find Purple Trash Bag Locations in Portland, Maine'>
            <Container maxWidth="lg">
                <Box sx={{
                    height:"100%",
                    width:"100%",
                    maxWidth: "1200px",
                }}>
                    <Typography variant={"h1"}>City Trash Bag Vendors</Typography>
                    <Typography variant={"h2"}>Portland, ME</Typography>
                    <Typography variant={"h3"}>Showing locations within {radius} miles.</Typography>
                    <label>Use the slider to change your search radius:</label>
                    <Slider 
                        value={radius} 
                        color={"secondary"} 
                        valueLabelDisplay="auto" 
                        step={5}
                        marks
                        min={1}
                        max={100}
                        onChange={(event:any)=>setRadius(event?.target.value)}
                    />
                    <ul>
                        {!locations || locations.length <= 0 ? undefined :
                            locations.map((location:any,index:number)=> {
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
                    </ul>
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
                            popUpRef={popUpRef}
                        />
                    </div>
                </Box>
          
            </Container>
        </Layout>
    );
};

export default Home;
