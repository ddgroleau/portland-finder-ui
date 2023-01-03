import { useEffect, useState } from "react";
import { Coordinates, defaultCoordinates } from "./coordinates";

export const usePosition = () => {
    const [position, setPosition] = useState<Coordinates>(defaultCoordinates);
    const [error, setError] = useState<string>('');
    
    const onChange = ({coords}:{coords:Coordinates}) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };  

    const onError = (error:{message:string}) => {
        setError(error.message);
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