export interface City {
  id: number;
  name: string;
  stateCode: number | string;
  countryCode: string;
  countryFull: string;
  lat: number;
  lon: number;
}

export interface WeatherHourData {
  main: string;
  description: string;
  icon: string;
  dt: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
}
