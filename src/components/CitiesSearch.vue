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
      :items="appStore.itemsCities"
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
import { ref } from "vue";
import { useAppStore } from "../store/app.store";
import InputCombobox from "./input/InputCombobox.vue";
import { City } from "../types/custom.types";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

// DATA
const inputSearch = ref<HTMLElement | null>();

const appStore = useAppStore();

const showSearchBar = ref(false);

// METHODS

function onUpdateModelValue(city: City | null) {
  if (!city) {
    showSearchBar.value = false;
    return;
  }
  appStore.selectCity(city.city_id);
  showSearchBar.value = false;
}
</script>
