import useStore from "../zustand/store";
import { CircularProgress } from "@mui/material";
import Filters from "./Filters";
import FlightResultsHeading from "./FlightResultsHeading";
import FlightDetailsCard from "./FlightDetailsCard";
import useFilterStore from "../zustand/filter";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

const SearchResults = () => {
  const { departingFlightsResult, returnFlightsResult, loading, tripType } =
    useStore();
  const { filterByAirlines, filterByPrice, showFilters, setShowFilters } =
    useFilterStore();

  const sortByPrice = {
    lowToHigh: (a, b) => a.price - b.price,
    highToLow: (a, b) => b.price - a.price,
  };

  const filterAndSort = (arr) => {
    if (arr?.length > 0) {
      return arr
        ?.filter((flight) => filterByAirlines[flight.airline])
        ?.sort(sortByPrice[filterByPrice]);
    }
  };

  return (
    <>
      <div className="sm:hidden h-12 w-full rounded-lg bg-white mt-6 my-2 flex justify-between items-center px-4">
        <h2 className="font-bold text-xl">Search Result</h2>
        <FilterAltRoundedIcon onClick={() => setShowFilters(true)} />
      </div>
      <div className="m-h-32 min-w-[100%] flex gap-x-4 sm:mt-6">
        {/* Filters */}
        {showFilters && <Filters />}

        {/* One-way */}
        <div className="flex-grow h-full border sm:overflow-y-auto rounded-lg bg-white">
          {/* One-Way Result */}
          <FlightResultsHeading type="departure" />
          <div className="p-4">
            {filterAndSort(departingFlightsResult)?.length > 0 ? (
              filterAndSort(departingFlightsResult)?.map((flight) => (
                <FlightDetailsCard key={flight.id} flight={flight} />
              ))
            ) : (
              <p className="text-center">No flights found</p>
            )}
          </div>
        </div>
        {/* Two-way Result */}
        {tripType === "twoWay" && returnFlightsResult?.length > 0 && (
          <div className="flex-grow  h-full border sm:overflow-y-auto rounded-lg bg-white">
            <FlightResultsHeading type="return" />
            <div className="p-4">
              {filterAndSort(returnFlightsResult)?.length > 0 ? (
                filterAndSort(returnFlightsResult)?.map((flight) => (
                  <FlightDetailsCard key={flight.id} flight={flight} />
                ))
              ) : (
                <p className="text-center">No flights found</p>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <CircularProgress
            size={20}
            className="absolute z-10 left-[50%] top=[50%]"
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SearchResults;
