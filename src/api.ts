import axios from "axios";
import { useQuery } from "react-query";

export const useGetLocationsInRadius = (radius:number,latitude:number,longitude:number) => {
    const baseApiUri = process.env.NODE_ENV === "development" ? 
        "http://localhost:5000/api" : process.env.NEXT_PUBLIC_API_URI;
        
    return useQuery('GET_LOCATIONS_IN_RADIUS',async ()=> {
        const requestUri = baseApiUri + `/locations/radius/${radius}?latitude=${latitude}&longitude=${longitude}`;
        const { data } = await axios.get(requestUri);
        return data;
    }, { enabled: false });
};