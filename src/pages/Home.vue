<template>
  <div v-if="!selectedCity || !forecastData">
    <!-- LOADING MESSAGE -->
    <div
      v-if="!forecastErrorMessage"
      class="text-neutral-700 text-md sm:text-xl text-center"
    >
      Loading...
    </div>
    <!-- ERROR MESSAGE -->
    <div v-else class="flex flex-col items-center justify-center">
      <div class="text-red-700 text-md sm:text-xl text-center mb-3">
        {{ forecastErrorMessage }}
      </div>
      <button
        class="text-blue-700 hover:underline"
        @click="appStore.updateForecast()"
      >
        <div class="flex items-center">
          <ArrowPathIcon class="size-4 mr-1" />
          <span>Try again</span>
        </div>
      </button>
    </div>
  </div>
  <!-- FORECAST DATA LOADED -->
  <div v-else>
    <h1 class="mb-3 text-xl sm:text-2xl text-center">
      <span>{{ selectedCity.city_name }}</span>
      <span class="text-neutral-700"> ({{ selectedCity.country_code }}) </span>
    </h1>
    <!-- NEXT HOURS -->
    <WeatherNextHours v-if="forecastData" :forecastData="forecastData" />
    <!-- NEXT DAYS -->
    <WeatherNexDays v-if="forecastData" :forecastData="forecastData" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";
import { useAppStore } from "../store/app.store";
import WeatherNexDays from "../components/weather/WeatherNexDays.vue";
import WeatherNextHours from "../components/weather/WeatherNextHours.vue";

// DATA

const appStore = useAppStore();

const selectedCity = computed(() => appStore.selectedCity);
const forecastData = computed(() => appStore.forecastData);
const forecastErrorMessage = computed(() => appStore.forecastErrorMessage);
</script>
