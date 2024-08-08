export interface OpenWeatherApiWeatherParameters {
  lat: number;
  lon: number;
  mode?: "json" | "xml" | "html";
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface OpenWeatherApiForecastParameters {
  lat: number;
  lon: number;
  mode?: "json" | "xml";
  cnt?: number; // from 1 to 40
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface OpenWeatherApiWeatherResponseData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface OpenWeatherApiForecastResponseData {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

interface Clouds {
  all: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface List {
  dt: number;
  main: ForecastMain;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: ForecastSys;
  dt_txt: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
}

interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
}

interface WeatherSys {
  pod: string;
}

interface ForecastSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
