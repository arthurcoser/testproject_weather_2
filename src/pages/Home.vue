<template>
  <div class="bg-blue-100 mb-4">
    <h1 class="text-2xl">Current weather</h1>
    <div v-if="weatherData">
      <div>{{ weatherData.main.temp.toFixed(0) }}°C</div>
      <div class="text-sm text-blue-900">
        {{ weatherData.main.humidity.toFixed(0) }}%
      </div>
      <img
        :src="iconSrc(weatherData.weather?.[0].icon, '@2x')"
        :alt="weatherData.weather?.[0].description"
      />
      <div>
        {{
          new Date(
            weatherData.dt * 1000 + weatherData.timezone * 1000,
          ).toLocaleTimeString("en", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        }}
      </div>
      <div class="text-sm">
        {{
          new Date(
            weatherData.dt * 1000 + weatherData.timezone * 1000,
          ).toLocaleDateString("en", {
            timeZone: "UTC",
            month: "short",
            day: "2-digit",
          })
        }}
      </div>
    </div>
    <!-- <pre>{{ weatherData }}</pre> -->
  </div>
  <div class="bg-yellow-100 mb-4">
    <h1 class="text-2xl">Forecast 5d 3h</h1>
    <!-- <pre>{{ forecastData }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import requester from "../requester";
import { useCitiesStore } from "../store/cities.store";
import {
  OpenWeatherApiForecastResponseData,
  OpenWeatherApiWeatherResponseData,
} from "../types/open-weather.types";

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

function iconSrc(icon: string, size = "") {
  return `https://openweathermap.org/img/wn/${icon}${size}.png`;
}

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
