import { defineStore } from "pinia";
import { City } from "../types/custom.types";
import Papa from "papaparse";

const defaultCities: City[] = [
  {
    city_id: 3451190,
    city_name: "Rio de Janeiro",
    state_code: 21,
    country_code: "BR",
    country_full: "Brazil",
    lat: -22.90278,
    lon: -43.2075,
  },
  {
    city_id: 1816670,
    city_name: "Beijing",
    state_code: 22,
    country_code: "CN",
    country_full: "Paracel Islands",
    lat: 39.9075,
    lon: 116.39723,
  },
  {
    city_id: 5368361,
    city_name: "Los Angeles",
    state_code: "CA",
    country_code: "US",
    country_full: "United States",
    lat: 34.05223,
    lon: -118.24368,
  },
];

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    selectedCity: defaultCities[0],
    defaultCities: defaultCities,
    itemsCities: defaultCities,
  }),
  actions: {
    selectCity(cityId: number) {
      const city = this.itemsCities.find((c) => c.city_id === cityId);
      if (!city) {
        return;
      }
      this.selectedCity = city;
    },
    async getItemsCities() {
      const response = await fetch("/cities_20000.csv");
      const csvText = await response.text();
      this.itemsCities = await new Promise<City[]>((resolve, reject) =>
        Papa.parse<City>(csvText, {
          delimiter: ",",
          dynamicTyping: true,
          header: true,
          complete: (results) => {
            resolve(
              results.data.sort((a, b) =>
                a.city_name
                  .toLocaleLowerCase()
                  .localeCompare(b.city_name.toLocaleLowerCase()),
              ),
            );
          },
          error: reject,
        }),
      );
    },
  },
});
