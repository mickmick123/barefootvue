import ApiService from "./api.service";
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

class ResponseError extends Error {
    errorCode: any;
    errorMessage: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const HomeService = {
    secretArea: async function() {
        try {
            return ApiService.get("/api/profile");
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
   getLocation: async function(){
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
        const coordinates = await Geolocation.getCurrentPosition(options);
        ApiService.unmount401Interceptor();
        return {lat: coordinates.coords.latitude, lng: coordinates.coords.longitude};
    },
}



export { HomeService, ResponseError };
