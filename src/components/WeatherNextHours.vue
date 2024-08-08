<template>
  <div class="flex flex-col divide-y mb-4 pt-2 shadow rounded bg-white">
    <h1 class="text-xl sm:text-2xl px-3 mb-2">Next hours</h1>
    <div class="flex flex-nowrap overflow-x-auto divide-x">
      <div v-for="data in nextHours" :key="data.dt" class="my-4">
        <WeatherHour :data="data" class="mx-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { OpenWeatherApiForecastResponseData } from "../types/open-weather.types";
import { WeatherHourData } from "../types/custom.types";
import WeatherHour from "../components/WeatherHour.vue";

// PROPS
export interface Props {
  forecastData: OpenWeatherApiForecastResponseData;
}

const props = defineProps<Props>();

// DATA

const nextHours = computed<WeatherHourData[]>(() => {
  if (!props.forecastData) return [];
  const dtTimezone = props.forecastData.city.timezone * 1000;
  return props.forecastData.list.slice(0, 8).map((item) => ({
    main: item.weather[0].main,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    dt: item.dt * 1000 + dtTimezone,
    temp: item.main.temp,
    tempMin: item.main.temp_min,
    tempMax: item.main.temp_max,
    humidity: item.main.humidity,
    units: "metric",
  }));
});
</script>
