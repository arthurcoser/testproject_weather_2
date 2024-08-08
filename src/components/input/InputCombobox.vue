<template>
  <Combobox v-model="selectedItem">
    <div class="relative">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
      >
        <ComboboxInput
          @change="query = $event.target.value"
          :displayValue="displayValue"
          class="w-full border-none py-1 px-3 text-neutral-900 focus:ring-0"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
          @click="onClickClose()"
        >
          <XMarkIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        v-show="!!query?.trim()"
        class="rounded border bg-white shadow-lg py-1 absolute w-full"
      >
        <div
          class="max-h-48 overflow-auto"
          ref="optionsContainer"
          @scroll="onScroll"
        >
          <div
            v-if="displayedItems.length === 0"
            class="italic text-neutral-500 px-2 py-1 mx-1 cursor-default"
          >
            No data found
          </div>
          <ComboboxOption
            v-for="item in displayedItems"
            :key="item.value"
            :value="itemValue ? item?.[itemValue] : item"
            class="cursor-pointer px-3 py-1 rounded hover:bg-black/5"
          >
            <template v-if="$slots['item-title']">
              <slot name="item-title" :item="item" />
            </template>
            <template v-else>
              {{ item?.[itemTitle] }}
            </template>
          </ComboboxOption>
        </div>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

// PROPS
export interface Props {
  items: any[];
  itemValue?: string;
  itemTitle?: string;
}
const props = withDefaults(defineProps<Props>(), {
  itemValue: "",
  itemTitle: "title",
});

// DATA

const selectedItem = defineModel<any>();
const displayValue = (item: any) => item?.[props.itemTitle];

const optionsContainer = ref<HTMLElement | null>(null);

const itemsToShow = ref(20); // Initial number of items to show
const displayedItems = computed(() => {
  if (itemsToShow.value > filteredItems.value.length)
    return filteredItems.value;
  return filteredItems.value.slice(0, itemsToShow.value);
});

const query = ref("");
const cleanQuery = computed(
  () => deburr(query.value?.trim()?.toLowerCase()) || "",
);
const filteredItems = computed(() => {
  if (!cleanQuery.value) return [];
  return props.items.filter((item) => {
    return deburr(item?.[props.itemTitle].toLowerCase()).includes(
      cleanQuery.value.toLowerCase(),
    );
  });
});

// METHODS

function deburr(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function onClickClose() {
  query.value = "";
  selectedItem.value = null;
}

function onScroll() {
  if (optionsContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = optionsContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      itemsToShow.value += 10;
    }
  }
}
</script>
