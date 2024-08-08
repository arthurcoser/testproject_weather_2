export interface City {
  city_id: number;
  city_name: string;
  state_code: number | string;
  country_code: string;
  country_full: string;
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
  units: "standard" | "metric" | "imperial";
}

export interface WeatherDayData {
  main: string;
  description: string;
  icon: string;
  day: string;
  tempMin: number;
  tempMax: number;
  units: "standard" | "metric" | "imperial";
}
