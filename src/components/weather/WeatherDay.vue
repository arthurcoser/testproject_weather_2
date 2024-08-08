<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center justify-center">
      <img :src="iconSrc(data.icon)" :alt="data.main" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="text-lg">
        {{ data.day }}
      </div>
      <div class="text-xs text-neutral-700/50">
        {{ data.main }} throughout the day
      </div>
    </div>
    <div class="flex items-center justify-center text-sm text-neutral-700">
      <div class="mr-1">{{ data.tempMin.toFixed(0) }}°C</div>
      <div class="ml-1">{{ data.tempMax.toFixed(0) }}°C</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeatherDayData } from "../../types/custom.types.ts";

// PROPS
export interface Props {
  data: WeatherDayData;
}
defineProps<Props>();

// METHODS

function iconSrc(icon: string, size = "") {
  return `https://openweathermap.org/img/wn/${icon}${size}.png`;
}
</script>
