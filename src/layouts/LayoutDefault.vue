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
          v-for="city in defaultCities"
          :key="city.id"
          :class="[
            'py-1 px-3 border-b-2 hover:bg-black/5',
            `${selectedCity.id === city.id ? 'border-b-orange-500 text-neutral-950' : 'border-b-neutral-100 text-neutral-950/50'}`,
          ]"
          @click="citiesStore.selectCity(city.id)"
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
import { computed } from "vue";
import { useCitiesStore } from "../store/cities.store";

// DATA

const appTitle = import.meta.env.VITE_APP_TITLE;
const citiesStore = useCitiesStore();
const selectedCity = computed(() => citiesStore.selectedCity);
const defaultCities = computed(() => citiesStore.defaultCities);
</script>
