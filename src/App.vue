<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCitiesStore } from "./store/cities.store";

const citiesStore = useCitiesStore();

// ON MOUNTED
onMounted(() => {
  // select first default city when starting
  citiesStore.selectCity(citiesStore.defaultCities[0].city_id);
  // load cities from csv file for search bar
  citiesStore.loadItemsCities();
});
</script>
