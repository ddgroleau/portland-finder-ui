import Layout from '@/components/Layout';
import LeafletMap from '@/components/LeafletMap';
import { Container, Input, InputLabel, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGetLocationsInRadius } from 'src/api';
import { usePosition } from 'src/usePosition';

const Home = () => {
    const [locations, setLocations] = useState<any>(null);
    const [radius, setRadius] = useState<number>(10);
    const {latitude, longitude, error} = usePosition();
    const { data, isSuccess, isError, isLoading } = useGetLocationsInRadius(radius, latitude, longitude, setLocations);

    return (
        <Layout title="Find Purple Trash Bags 🚮" description='Find Purple Trash Bag Locations in Portland, Maine'>
            <Container maxWidth="lg">
                <Box sx={{
                    height:"100%",
                    width:"100%",
                    maxWidth: "800px",
                }}>
                    <Typography component={"h1"}>Portland City Trash Bag Vendors</Typography>
                    <InputLabel color={"secondary"}>Searching in Radius: {radius} miles.</InputLabel>
                    <ul>
                        {!locations || locations.length <= 0 ? undefined :
                            locations.slice(0,5).map((location:any,index:number)=> {
                                return (
                                    <li key={index}>
                                        {location.name} - {location.distance} mile(s) away -&nbsp;
                                        <Link href={location.directionsUri} target="_blank">Get Directions</Link>
                                    </li>
                                );
                            })}
                    </ul>
 
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
                    <LeafletMap 
                        mapHeight={"80vh"}
                        mapWidth={"100%"}
                        coordinates={{
                            latitude:latitude,
                            longitude:longitude
                        }}
                    />
                </Box>
          
            </Container>
        </Layout>
    );
};

export default Home;
