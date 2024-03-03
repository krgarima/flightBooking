import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import useFilterStore from "../zustand/filter";
import { AIRLINES_LIST } from "../utils/constants";
import CloseIcon from "@mui/icons-material/Close";

const Filters = () => {
  const {
    filterByAirlines,
    setFilterByAirlines,
    filterByPrice,
    setFilterByPrice,
    setShowFilters,
    showFilters,
  } = useFilterStore();

  const handleSorting = () => {
    if (filterByPrice === "lowToHigh") {
      setFilterByPrice("highToLow");
    } else {
      setFilterByPrice("lowToHigh");
    }
  };

  const handleClearAll = () => {
    setFilterByAirlines(AIRLINES_LIST);
    setFilterByPrice("lowToHigh");
  };

  return (
    <div
      className={`w-full sm:w-1/5 h-full border overflow-auto absolute sm:static z-10 left-0 top-0 p-4 rounded-lg bg-white`}
    >
      <div className="sm:hidden h-8 w-full mb-2">
        <CloseIcon
          className="float-right"
          onClick={() => setShowFilters(false)}
        />
      </div>
      <div className="flex justify-between items-center h-8 border-b pb-4">
        <span className="font-semibold">Filters</span>
        <button className="font-bold text-blue-600" onClick={handleClearAll}>
          Clear all
        </button>
      </div>
      <div>
        {/* Filter by Airlines */}
        <FormGroup className="m-4 border-b ">
          <FormLabel id="demo-row-radio-buttons-group-label">
            Airlines
          </FormLabel>
          {Object.keys(AIRLINES_LIST).map((airline) => (
            <FormControlLabel
              key={airline}
              control={<Checkbox checked={filterByAirlines[airline]} />}
              label={airline}
              onChange={(e) =>
                setFilterByAirlines({
                  ...filterByAirlines,
                  [airline]: e.target.checked,
                })
              }
            />
          ))}
        </FormGroup>

        {/* Sort by Price */}
        <FormGroup className="m-4">
          <FormLabel id="demo-row-radio-buttons-group-label">Sort By</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="lowToHigh"
              control={
                <Radio
                  checked={filterByPrice === "lowToHigh"}
                  onChange={handleSorting}
                />
              }
              label="Low to High"
            />
            <FormControlLabel
              value="highToLow"
              control={
                <Radio
                  checked={filterByPrice === "highToLow"}
                  onChange={handleSorting}
                />
              }
              label="High to Low"
            />
          </RadioGroup>
        </FormGroup>
      </div>
    </div>
  );
};

export default Filters;
