import {
  OpenWeatherApiWeatherParameters,
  OpenWeatherApiWeatherResponseData,
  OpenWeatherApiForecastParameters,
  OpenWeatherApiForecastResponseData,
} from "../types/open-weather.types";

async function currentWeather(params: OpenWeatherApiWeatherParameters) {
  const { lat, lon, mode = "json", units = "metric", lang = "en" } = params;
  const urlSearchParams = new URLSearchParams({
    appid: import.meta.env.VITE_OPENWEATHER_APPID,
    lat: lat.toString(),
    lon: lon.toString(),
    units,
    mode,
    lang,
  }).toString();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${urlSearchParams}`,
  );
  const data: OpenWeatherApiWeatherResponseData = await response.json();
  return data;
}

async function forecast5d3h(params: OpenWeatherApiForecastParameters) {
  const {
    lat,
    lon,
    mode = "json",
    cnt,
    units = "metric",
    lang = "en",
  } = params;
  const urlSearchParams = new URLSearchParams({
    appid: import.meta.env.VITE_OPENWEATHER_APPID,
    lat: lat.toString(),
    lon: lon.toString(),
    units,
    mode,
    lang,
    ...(cnt ? { cnt: cnt.toString() } : {}),
  }).toString();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${urlSearchParams}`,
  );
  const data: OpenWeatherApiForecastResponseData = await response.json();
  return data;
}

export default { currentWeather, forecast5d3h };
