import axios from "axios";
import { useQuery } from "react-query";

export const useGetLocationsInRadius = (radius:number,latitude:number,longitude:number,callback:Function) => {
    const baseApiUri = "http://localhost:5000/api";
    return useQuery('GET_LOCATIONS_IN_RADIUS',async ()=> {
        const requestUri = baseApiUri + `/locations/radius/${radius}?latitude=${latitude}&longitude=${longitude}`;
        const response = await axios.get(requestUri);
        callback(response.data);
        return response.data;
    });
};