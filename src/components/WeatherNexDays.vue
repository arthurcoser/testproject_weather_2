<template>
  <div class="flex flex-col divide-y mb-4 py-2 shadow rounded bg-white">
    <h1 class="text-xl sm:text-2xl px-3 mb-2">
      Next {{ nextDays.length }} days
    </h1>
    <div class="flex flex-col divide-y">
      <div v-for="data in nextDays" :key="data.day" class="mx-4">
        <WeatherDay :data="data" class="my-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { max, maxBy, minBy, uniq } from "lodash";
import { OpenWeatherApiForecastResponseData } from "../types/open-weather.types";
import { WeatherDayData } from "../types/custom.types";
import WeatherDay from "../components/WeatherDay.vue";
import { useAppStore } from "../store/app.store";

// PROPS
export interface Props {
  forecastData: OpenWeatherApiForecastResponseData;
}

const props = defineProps<Props>();

// DATA

const appStore = useAppStore();

const nextDays = computed<WeatherDayData[]>(() => {
  if (!props.forecastData) return [];
  const dtTimezone = props.forecastData.city.timezone * 1000;
  const todayKey = new Date().toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
  const days: { [day: string]: any[] } = {};
  props.forecastData.list.forEach((item) => {
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
    keys = keys.slice(indexToday + 1, indexToday + 6);
  }
  return keys.map((key) => {
    const items = days[key];
    const mostCommonMains = mostCommon(items.map((item) => item.main));
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
      units: appStore.forecastUnits,
    };
  });
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
</script>
