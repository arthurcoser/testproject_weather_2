<template>
  <div class="flex flex-col min-h-screen">
    <div class="bg-blue-500 text-white py-1">
      <div class="container mx-auto h-full flex items-center justify-between">
        <div class="text-xl font-medium">{{ appTitle }}</div>
        <button class="hover:bg-black/10 rounded px-3 py-1">Search</button>
      </div>
    </div>
    <div class="bg-neutral-100">
      <div class="container mx-auto">
        <button
          v-for="city in cities"
          :key="city.id"
          :class="[
            'py-1 px-3 border-b-2 hover:bg-black/5',
            `${selectedCityId === city.id ? 'border-b-orange-500 text-neutral-950' : 'border-b-neutral-100 text-neutral-950/50'}`,
          ]"
          @click="selectedCityId = city.id"
        >
          {{ city.name }}
        </button>
      </div>
    </div>
    <div class="flex-grow">
      <div class="container mx-auto py-3">
        <router-view />
      </div>
    </div>
    <div class="bg-blue-500 text-white py-1">
      <div class="container mx-auto h-full flex items-center justify-end">
        Last updated on
        {{
          new Date().toLocaleString("en", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { City } from "../types/custom.types";

// DATA

const appTitle = import.meta.env.VITE_APP_TITLE;

const selectedCityId = ref(3451190);
const cities: City[] = [
  {
    id: 3451190,
    name: "Rio de Janeiro",
    stateCode: 21,
    countryCode: "BR",
    countryFull: "Brazil",
    lat: -22.90278,
    lon: -43.2075,
  },
  {
    id: 1816670,
    name: "Beijing",
    stateCode: 22,
    countryCode: "CN",
    countryFull: "Paracel Islands",
    lat: 39.9075,
    lon: 116.39723,
  },
  {
    id: 5368361,
    name: "Los Angeles",
    stateCode: "CA",
    countryCode: "US",
    countryFull: "United States",
    lat: 34.05223,
    lon: -118.24368,
  },
];
</script>
