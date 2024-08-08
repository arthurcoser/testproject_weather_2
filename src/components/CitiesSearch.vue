<template>
  <div class="md: max-w-md">
    <div class="flex items-center">
      <button
        v-if="!showSearchBar"
        class="hover:text-white/60 rounded text-white p-1"
        @click="showSearchBar = true"
      >
        <div class="flex items-center justify-center">
          <span class="mr-2 truncate">Search</span>
          <MagnifyingGlassIcon class="size-5" />
        </div>
      </button>
    </div>
    <InputCombobox
      v-if="showSearchBar"
      ref="inputSearch"
      :items="citiesStore.itemsCities"
      item-title="city_name"
      @update:model-value="onUpdateModelValue"
    >
      <template v-slot:item-title="{ item }">
        <div class="flex justify-between items-center">
          <div>{{ item.city_name }}</div>
          <div class="text-neutral-500">{{ item.country_code }}</div>
        </div>
      </template>
    </InputCombobox>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCitiesStore } from "../store/cities.store";
import InputCombobox from "./input/InputCombobox.vue";
import { City } from "../types/custom.types";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

// DATA
const inputSearch = ref<HTMLElement | null>();

const citiesStore = useCitiesStore();

const showSearchBar = ref(false);

// ON MOUNTED
onMounted(() => {
  citiesStore.getItemsCities();
});

// METHODS

function onUpdateModelValue(city: City | null) {
  if (!city) {
    showSearchBar.value = false;
    return;
  }
  citiesStore.selectCity(city.city_id);
  showSearchBar.value = false;
}
</script>
