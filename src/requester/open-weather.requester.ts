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
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(
      data?.message || "Unknowm error while retrieving current weather data",
    );
  }
  return data as OpenWeatherApiWeatherResponseData;
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
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(
      data?.message || "Unknowm error while retrieving forecast data",
    );
  }
  return data as OpenWeatherApiForecastResponseData;
}

export default { currentWeather, forecast5d3h };
