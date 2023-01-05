import Layout from '@/components/Layout';
import MapResults from '@/components/MapResults';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import theme from 'src/theme';
import { usePosition } from 'src/usePosition';

const Home = () => {
    const {latitude, longitude, error} = usePosition();

    return (
        <Layout title="Find Purple Trash Bags" description='Find Purple Trash Bag Locations in Portland, Maine'>
            <Container maxWidth="lg">
                <Box sx={{
                    height:"100%",
                    width:"100%",
                    maxWidth: "1200px",
                }}>
                    <Typography variant={"h1"} style={{textAlign: "center"}}>
                        Portland Maine Trash Bag Vendors
                    </Typography>
                    <Grid display="flex" justifyContent="center" width="100%" marginBottom="1rem">
                        <Image src="/trash.png" height={200} width={200} alt="Purple trash bag"/>
                    </Grid>
                    <small>
                        <i>
                            This site is not affiliated with the city of Portland or any government agency. 
                            To find a trash bag vendor near you, visit&nbsp;
                            <Link 
                                style={{ color: theme.palette.secondary.main }} 
                                href="https://www.portlandmaine.gov/556/Trash" 
                                target="_blank"
                            >
                                portlandmaine.gov
                            </Link>. Never use this site ever.... ever.
                        </i>
                    </small>
                    <MapResults key={latitude} latitude={latitude} longitude={longitude} />
                </Box>
            </Container>
        </Layout>
    );
};

export default Home;
