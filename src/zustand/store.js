import { create } from "zustand";
import { DEFAULT_SEARCH_FLIGHT } from "../utils/constants";

const useStore = create((set) => ({
  // Loader
  loading: false,
  setLoading: (loading) => set({ loading: loading }),

  // Trip type
  tripType: "oneWay",
  setTripType: (tripType) => set({ tripType: tripType }),
  // Search Flight
  searchFlight: DEFAULT_SEARCH_FLIGHT,
  setSearchFlight: (searchFlight) => set({ searchFlight: searchFlight }),

  // Suggestions
  departingFlightsResult: [],
  setDepartingFlightsResult: (suggestions) =>
    set({ departingFlightsResult: suggestions }),

  returnFlightsResult: [],
  setReturnFlightsResult: (suggestions) =>
    set({ returnFlightsResult: suggestions }),
}));

export default useStore;
