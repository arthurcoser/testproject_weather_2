<template>
  <!-- NEXT HOURS -->
  <div class="flex flex-col divide-y mb-4 pt-2 shadow rounded bg-white">
    <h1 class="text-2xl px-3 mb-2">Next hours</h1>
    <div class="flex flex-nowrap overflow-x-auto divide-x">
      <div v-for="data in nextHours" :key="data.dt" class="my-4">
        <WeatherHour :data="data" class="mx-2" />
      </div>
    </div>
  </div>
  <!-- NEXT DAYS -->
  <div class="flex flex-col divide-y mb-4 pt-2 shadow rounded bg-white">
    <h1 class="text-2xl px-3 mb-2">Next {{ nextDays.length }} days</h1>
    <div class="flex flex-col divide-y">
      <div v-for="data in nextDays" :key="data.day" class="mx-4">
        <WeatherDay :data="data" class="my-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { max, maxBy, min, minBy, uniq } from "lodash";
import requester from "../requester";
import { useCitiesStore } from "../store/cities.store";
import {
  OpenWeatherApiForecastResponseData,
  OpenWeatherApiWeatherResponseData,
} from "../types/open-weather.types";
import { WeatherDayData, WeatherHourData } from "../types/custom.types";
import WeatherDay from "../components/WeatherDay.vue";
import WeatherHour from "../components/WeatherHour.vue";

// DATA

const citiesStore = useCitiesStore();

const weatherData = ref<OpenWeatherApiWeatherResponseData | null>(null);
const forecastData = ref<OpenWeatherApiForecastResponseData | null>(null);
const nextHours = computed<WeatherHourData[]>(() => {
  if (!forecastData.value) return [];
  const dtTimezone = forecastData.value.city.timezone * 1000;
  return forecastData.value.list.slice(0, 8).map((item) => ({
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
const nextDays = computed<WeatherDayData[]>(() => {
  if (!forecastData.value) return [];
  const dtTimezone = forecastData.value.city.timezone * 1000;
  const todayKey = new Date().toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
  const days: { [day: string]: any[] } = {};
  forecastData.value.list.forEach((item) => {
    const date = new Date(item.dt * 1000 + dtTimezone);
    const key = date.toLocaleDateString("en", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
    if (!days?.[key]) {
      days[key] = [];
    }
    days[key].push({
      id: item.weather[0].id,
      main: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon.replace("n", "d"), // avoid night icons
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
    });
  });
  let keys = Object.keys(days);
  if (keys.length > 5) {
    const indexToday = keys.indexOf(todayKey);
    keys = keys.slice(indexToday, indexToday + 5);
  }
  return keys.map((key) => {
    const items = days[key];
    const mostCommonMains = mostCommon(items.map((item) => item.main));
    console.log(mostCommonMains);
    const mostCommonRelevant = minBy(
      items.filter((item) => mostCommonMains.includes(item.main)),
      (item) => item.id,
    );
    const tempMin = minBy(items, (item) => item.tempMin).tempMin;
    const tempMax = maxBy(items, (item) => item.tempMax).tempMax;
    return {
      id: mostCommonRelevant.id,
      main: mostCommonRelevant.main,
      description: mostCommonRelevant.description,
      icon: mostCommonRelevant.icon,
      day: key,
      tempMin,
      tempMax,
      units: "metric",
    };
  });
});

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

function mostCommon(arr: Array<string>) {
  const frequency: { [k: string]: number } = {};
  arr.forEach((el) => {
    if (!frequency?.[el]) {
      frequency[el] = 0;
    }
    frequency[el]++;
  });
  const maxFrequency = max(Object.values(frequency)) || 0;
  return uniq(arr).filter((el) => frequency[el] === maxFrequency);
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
