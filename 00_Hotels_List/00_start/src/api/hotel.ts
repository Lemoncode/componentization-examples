import {HotelEntity} from '../model';
import axios from 'axios';

// In a real project move this as a env variable
const baseURL = 'http://localhost:3000';
const baseURLThumbs = `${baseURL}`;
const baseURLApi = `${baseURL}/api`;
const hotelListUrl = `${baseURLApi}/hotels`;

export const getHotelList = () : Promise<HotelEntity[]> => {  
  const promise : Promise<HotelEntity[]> = new Promise(function(resolve, reject) {
    try {
      axios.get(hotelListUrl).then(
        (response) => 
          resolve(mapHotelApiToModel(response.data))
      );
    }
    catch(ex) {
      reject(ex)
    }      
  });

  return promise;
}  

const mapHotelApiToModel = (data) => {
  const hotelList = data as HotelEntity[];

  return hotelList.map((hotel) => ({
    ...hotel,
    thumbNailUrl: `${baseURLThumbs}${hotel.thumbNailUrl}`
  }));
}

