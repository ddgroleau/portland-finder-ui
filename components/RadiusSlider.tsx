import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction } from 'react';

type RadiusSliderProps = {
    radius: number,
    setRadius: Dispatch<SetStateAction<number>>
}

const RadiusSlider = ({radius,setRadius}:RadiusSliderProps) => {
    return (
        <Box width="fit-content">
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
                    max={20}
                    onChange={(event:any)=>setRadius(event?.target.value)}
                    marks={[{value: 1, label: '1 mile'},{value: 20, label: '20 miles'}]}
                />
            </Box>
        </Box>
    );
};

export default RadiusSlider;