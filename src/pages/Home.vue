<template>
  <h1 class="text-3xl font-medium mb-4">Simple Weather</h1>
  <div class="bg-blue-100 mb-4">
    <h2 class="text-2xl">Current weather</h2>
    <pre>{{ weatherData }}</pre>
  </div>
  <div class="bg-yellow-100 mb-4">
    <h2 class="text-2xl">Forecast 5d 3h</h2>
    <pre>{{ forecastData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import requester from "../requester";
import {
  OpenWeatherApiForecastResponseData,
  OpenWeatherApiWeatherResponseData,
} from "../types/open-weather.types";

// DATA

const weatherData = ref<OpenWeatherApiWeatherResponseData | null>(null);
const forecastData = ref<OpenWeatherApiForecastResponseData | null>(null);

const city = {
  id: 3451190,
  name: "Rio de Janeiro",
  stateCode: 21,
  countryCode: "BR",
  countryFull: "Brazil",
  lat: -22.90278,
  lon: -43.2075,
};

// ON MOUNTED
onMounted(() => {
  getWeather({ lat: city.lat, lon: city.lon });
  getForecast({ lat: city.lat, lon: city.lon });
});

// METHODS

async function getWeather(options: { lat: number; lon: number }) {
  const { lat, lon } = options;
  try {
    weatherData.value = await requester.openWeather.currentWeather({
      lat,
      lon,
    });
  } catch (err) {
    console.error(err);
  }
}

async function getForecast(options: { lat: number; lon: number }) {
  const { lat, lon } = options;
  try {
    forecastData.value = await requester.openWeather.forecast5d3h({
      lat,
      lon,
    });
  } catch (err) {
    console.error(err);
  }
}
</script>
