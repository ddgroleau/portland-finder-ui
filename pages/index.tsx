import Layout from '@/components/Layout';
import LeafletMap from '@/components/LeafletMap';
import { Container, Input, InputLabel, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { usePosition } from 'src/usePosition';

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [radius, setRadius] = useState<number>(50);
    return (
        <Layout title="Find Purple Trash Bags 🚮" description='Find Purple Trash Bag Locations in Portland, Maine'>
            <Container maxWidth="lg">
                <Box sx={{
                    height:"100%",
                    width:"100%",
                }}>
                    <Typography component={"h1"}>Portland City Trash Bag Vendors</Typography>
                    <span>Searching in Radius: {radius} miles.</span>
                    <Slider 
                        value={radius} 
                        color={"secondary"} 
                        valueLabelDisplay="auto" 
                        onChange={(event:any)=>setRadius(event?.target.value)}
                    />
                    <LeafletMap 
                        mapHeight={"80vh"}
                        mapWidth={"100%"}
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Home;
