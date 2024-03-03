import { create } from "zustand";
import { AIRLINES_LIST } from "../utils/constants";

const useFilterStore = create((set) => ({
  filterByAirlines: AIRLINES_LIST,
  setFilterByAirlines: (filterByAirlines) =>
    set({ filterByAirlines: filterByAirlines }),

  filterByPrice: "lowToHigh",
  setFilterByPrice: (filterByPrice) => set({ filterByPrice: filterByPrice }),

  showFilters: true,
  setShowFilters: (showFilters) => set({ showFilters: showFilters }),
}));

export default useFilterStore;
