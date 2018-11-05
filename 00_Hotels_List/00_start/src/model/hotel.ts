import { object, number, string } from "prop-types";

export interface HotelEntity {
  id: string;
  type: string;
  name: string;
  created: Date;
  modified: Date;
  address1: string;
  airportCode: string;
  amenityMask: number;
  city: string;
  confidenceRating: number;
  countryCode: string;
  deepLink: string;
  highRate: number;
  hotelId: number;
  hotelInDestination: boolean;
  hotelRating: number;
  location: {
    latitude: number;
    longitude: number;
  },
  locationDescription: string;
  lowRate: number
  metadata: object;
  postalCode: string;
  propertyCategory: number;
  proximityDistance: number;
  proximityUnit: string;
  rateCurrencyCode: string;
  shortDescription: string;
  stateProvinceCode: string;
  thumbNailUrl: string;
  tripAdvisorRating: number;
  tripAdvisorRatingUrl: string;
}

