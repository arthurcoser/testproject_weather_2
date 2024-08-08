import { defineStore } from "pinia";
import { City } from "../types/custom.types";

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

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    selectedCity: cities[0],
    defaultCities: cities,
  }),
  actions: {
    selectCity(cityId: number) {
      const city = this.defaultCities.find((c) => c.id === cityId);
      if (!city) {
        return;
      }
      this.selectedCity = city;
    },
  },
});
