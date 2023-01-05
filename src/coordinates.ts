export interface Coordinates {
    latitude:number,
    longitude:number
}

export const defaultCoordinates:Coordinates = {
    latitude: 0,// 43.6591,
    longitude: -0//70.2568
};

export const ZOOM_OUT = 14;
export const ZOOM_IN = 18;