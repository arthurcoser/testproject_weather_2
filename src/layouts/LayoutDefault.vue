<template>
  <div class="flex flex-col min-h-screen">
    <!-- APP BAR -->
    <div class="bg-blue-500 h-12 py-1 px-3">
      <div class="container mx-auto h-full">
        <div class="flex items-center justify-between h-full">
          <div class="text-xl font-medium text-white text-nowrap">
            {{ appTitle }}
          </div>
          <div class="flex-shrink ml-3">
            <CitiesSearch />
          </div>
        </div>
      </div>
    </div>
    <!-- TABS DEFAULT CITIES -->
    <div class="bg-neutral-100">
      <div class="container mx-auto">
        <button
          v-for="city in appStore.defaultCities"
          :key="city.city_id"
          :class="[
            'py-1 px-3 border-b-2 hover:bg-black/5',
            `${appStore.selectedCity?.city_id === city.city_id ? 'border-b-orange-500 text-neutral-950' : 'border-b-neutral-100 text-neutral-950/50'}`,
          ]"
          @click="appStore.selectCity(city.city_id)"
        >
          {{ city.city_name }}
        </button>
      </div>
    </div>
    <!-- MAIN CONTENT -->
    <div
      class="flex-grow lg:flex lg:justify-center px-3 bg-gradient-to-b from-indigo-200 to-amber-200"
    >
      <div class="max-w-screen-lg">
        <div class="container mx-auto py-3">
          <router-view />
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <div class="bg-blue-500 h-8 text-white py-1 px-3">
      <div class="container mx-auto h-full flex items-center justify-end">
        <div
          class="flex items-center cursor-pointer"
          @click="appStore.updateForecast()"
        >
          <ArrowPathIcon class="size-4 mr-1" />
          <span>
            Last updated on
            {{
              (appStore.forecastUpdatedAt || new Date()).toLocaleString("en", {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "../store/app.store";
import CitiesSearch from "../components/CitiesSearch.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

// DATA

const appTitle = import.meta.env.VITE_APP_TITLE;
const appStore = useAppStore();
</script>
