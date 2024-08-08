<template>
  <div v-if="!selectedCity || !forecastData">
    <div
      v-if="!forecastErrorMessage"
      class="text-neutral-700 text-md sm:text-xl text-center"
    >
      Loading...
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <div class="text-red-700 text-md sm:text-xl text-center mb-3">
        {{ forecastErrorMessage }}
      </div>
      <button
        class="text-blue-700 hover:underline"
        @click="citiesStore.updateForecast()"
      >
        <div class="flex items-center">
          <ArrowPathIcon class="size-4 mr-1" />
          <span>Try again</span>
        </div>
      </button>
    </div>
  </div>
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
import { useCitiesStore } from "../store/cities.store";

import WeatherNexDays from "../components/WeatherNexDays.vue";
import WeatherNextHours from "../components/WeatherNextHours.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

// DATA

const citiesStore = useCitiesStore();

const selectedCity = computed(() => citiesStore.selectedCity);
const forecastData = computed(() => citiesStore.forecastData);
const forecastErrorMessage = computed(() => citiesStore.forecastErrorMessage);
</script>
