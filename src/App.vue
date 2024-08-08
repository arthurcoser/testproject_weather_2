<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "./store/app.store";

const appStore = useAppStore();

// ON MOUNTED
onMounted(() => {
  // select first default city when starting
  appStore.selectCity(appStore.defaultCities[0].city_id);
  // load cities from csv file for search bar
  appStore.loadItemsCities();
});
</script>
