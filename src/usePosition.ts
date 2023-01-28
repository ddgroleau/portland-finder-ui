import { Message } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Coordinates, defaultCoordinates } from "./coordinates";

export const usePosition = () => {
    const [position, setPosition] = useState<Coordinates>(defaultCoordinates);
    const [error, setError] = useState<string>('');
    
    const onChange = ({coords}:{coords:Coordinates}) => {
        /*
            Reference: https://blis.com/precision-matters-critical-importance-decimal-places-five-lowest-go/ 
            for lat/long precision.
        */
        const newLat = parseFloat(coords.latitude.toFixed(3));
        const newLon = parseFloat(coords.longitude.toFixed(3));
        
        if(newLat !== position.latitude || newLon !== position.longitude) {
            setPosition({
                latitude: newLat,
                longitude: newLon,
            });
        }

    };  

    const onError = (error:{message:string}) => {
        if(error.message.includes("User denied geolocation prompt")) {
            return setError(
                `<p style='margin-bottom:2rem'>
                    You denied the geolocation prompt 😕. Using coordinates of Portland City Hall (Maine).
                </p>`);
        }
        return setError(`<p style='margin-bottom:2rem'>${error.message}</p>`);
    }; 

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }    
        let watcher = geo.watchPosition(onChange, onError);   
        return () => geo.clearWatch(watcher);
    }, []);  

    return {...position, error};
};