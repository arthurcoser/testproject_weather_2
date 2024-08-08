<template>
  <div class="flex flex-col min-w-20 items-center">
    <div>{{ data.temp.toFixed(0) }}{{ tempUnit }}</div>
    <div class="text-xs text-blue-800">{{ data.humidity.toFixed(0) }}%</div>
    <img :src="iconSrc(data.icon)" :alt="data.description" />
    <div class="text-sm text-neutral-700">
      {{
        new Date(data.dt).toLocaleTimeString("en", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      }}
    </div>
    <div class="text-xs text-neutral-700/50">
      {{
        new Date(data.dt).toLocaleDateString("en", {
          timeZone: "UTC",
          month: "short",
          day: "2-digit",
        })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { WeatherHourData } from "../../types/custom.types.ts";

// PROPS
export interface Props {
  data: WeatherHourData;
}
const props = defineProps<Props>();

// DATA

const tempUnit = computed(() => {
  switch (props.data.units) {
    case "metric":
      return "°C";
    case "imperial":
      return "°F";
    default:
      "K";
  }
});

// METHODS

function iconSrc(icon: string, size = "") {
  return `https://openweathermap.org/img/wn/${icon}${size}.png`;
}
</script>
