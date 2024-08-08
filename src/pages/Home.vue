<template>
  <!-- NEXT HOURS -->
  <WeatherNextHours v-if="forecastData" :forecastData="forecastData" />
  <!-- NEXT DAYS -->
  <WeatherNexDays v-if="forecastData" :forecastData="forecastData" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import requester from "../requester";
import { useCitiesStore } from "../store/cities.store";
import {
  OpenWeatherApiForecastResponseData,
  OpenWeatherApiWeatherResponseData,
} from "../types/open-weather.types";

import WeatherNexDays from "../components/WeatherNexDays.vue";
import WeatherNextHours from "../components/WeatherNextHours.vue";

// DATA

const citiesStore = useCitiesStore();

const weatherData = ref<OpenWeatherApiWeatherResponseData | null>(null);
const forecastData = ref<OpenWeatherApiForecastResponseData | null>(null);

const selectedCity = computed(() => citiesStore.selectedCity);

watch(
  () => selectedCity.value,
  (newVal) => {
    getWeather({ lat: newVal.lat, lon: newVal.lon });
    getForecast({ lat: newVal.lat, lon: newVal.lon });
  },
);

// ON MOUNTED
onMounted(() => {
  getWeather({ lat: selectedCity.value.lat, lon: selectedCity.value.lon });
  getForecast({ lat: selectedCity.value.lat, lon: selectedCity.value.lon });
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
