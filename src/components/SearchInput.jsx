import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputLabel,
  Select,
  Autocomplete,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import useStore from "../zustand/store";
import dayjs from "dayjs";
import {
  PLACES,
  NUM_OFTRAVELLERS,
  SEAT_CLASS,
  DEFAULT_SNACKBAR_PROPERTIES,
} from "../utils/constants";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SearchInput = ({ setResultsFound }) => {
  const {
    tripType,
    setTripType,
    searchFlight,
    setSearchFlight,
    setDepartingFlightsResult,
    setReturnFlightsResult,
    setLoading,
  } = useStore();
  const [snackbar, setSnackbar] = useState(DEFAULT_SNACKBAR_PROPERTIES);

  const handleDateAtOnChange = (e, name) => {
    setSearchFlight({ ...searchFlight, [name]: e.format("YYYY-MM-DD") });
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbar({
      ...snackbar,
      open: true,
      message: message,
      severity: severity,
    });
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(DEFAULT_SNACKBAR_PROPERTIES);
  };

  const getFlights = async () => {
    try {
      const res = await fetch("https://api.npoint.io/378e02e8e732bb1ac55b");
      const data = await res.json();
      setLoading(false);

      const filterFlight = (date, origin, destination) => {
        return data.filter((flightFound) => {
          const departureDate = flightFound.departureTime.split("T")[0];

          return (
            flightFound.origin === origin &&
            flightFound.destination === destination &&
            departureDate === date
          );
        });
      };

      const filteredResultOneWay = filterFlight(
        searchFlight.originDate,
        searchFlight.origin,
        searchFlight.destination
      );
      setDepartingFlightsResult(filteredResultOneWay);
      if (filteredResultOneWay.length === 0) {
        handleOpenSnackbar("No flights found for Departure date", "error");
        return;
      }

      if (tripType === "twoWay") {
        const filteredResultRoundTrip = filterFlight(
          searchFlight.returnDate,
          searchFlight.destination,
          searchFlight.origin
        );
        setReturnFlightsResult(filteredResultRoundTrip);
        if (filteredResultRoundTrip.length === 0) {
          handleOpenSnackbar("No flights found for Return date", "error");
          return;
        }
      }
    } catch (error) {
      handleOpenSnackbar(error.message, "error");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // empty fields check
    if (
      searchFlight.origin === "" ||
      searchFlight.destination === "" ||
      !searchFlight.originDate ||
      (tripType === "twoWay" && !searchFlight.returnDate)
    ) {
      handleOpenSnackbar("One or more fields are empty!!", "error");
      setLoading(false);
      return;
    }

    // same city noy allowed
    else if (searchFlight.origin === searchFlight.destination) {
      handleOpenSnackbar("We don't provide same-city flights", "error");
      setLoading(false);
      return;
    }

    // Date valid or not
    else if (
      tripType === "twoWay" &&
      (dayjs(searchFlight.originDate).isAfter(searchFlight.returnDate) ||
        dayjs(searchFlight.returnDate).isBefore(searchFlight.originDate))
    ) {
      handleOpenSnackbar("Invalid date entered!!", "error");
      setLoading(false);
      return;
    } else {
      await getFlights();
      setResultsFound(true);
    }
  };

  return (
    <div className="min-h-32 w-full mt-6 bg-white px-4 py-6 rounded-lg">
      {/* Trip type */}
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          defaultValue="oneWay"
          onClick={(e) => setTripType(e.target.value)}
        >
          <FormControlLabel
            value="oneWay"
            control={<Radio />}
            label="One Way"
          />
          <FormControlLabel
            value="twoWay"
            control={<Radio />}
            label="Round Trip"
          />
        </RadioGroup>
      </FormControl>

      {/* Input Flight Details*/}
      <div className="m-h-16 w-full flex flex-col sm:flex-row gap-x-4 my-4 gap-y-4">
        {/* Origin */}
        <Autocomplete
          freeSolo
          value={searchFlight.origin}
          className="w-full"
          onChange={(_, newValue) => {
            setSearchFlight({ ...searchFlight, origin: newValue });
          }}
          options={PLACES}
          renderInput={(params) => (
            <TextField {...params} label="Origin" variant="outlined" />
          )}
        />
        {/* Destination */}
        <Autocomplete
          freeSolo
          value={searchFlight.destination}
          className="w-full"
          onChange={(_, newValue) => {
            setSearchFlight({ ...searchFlight, destination: newValue });
          }}
          options={PLACES}
          renderInput={(params) => (
            <TextField {...params} label="Destination" variant="outlined" />
          )}
        />

        {/* Dates */}
        <DatePicker
          className="w-full"
          label="Departure"
          format="YYYY-DD-MM"
          minDate={dayjs(Date.now())}
          onChange={(e) => handleDateAtOnChange(e, "originDate")}
        />
        <DatePicker
          className="w-full"
          label="Return"
          format="YYYY-DD-MM"
          disabled={tripType === "oneWay"}
          minDate={dayjs(Date.now())}
          onChange={(e) => handleDateAtOnChange(e, "returnDate")}
        />

        {/* Class */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchFlight.classType}
            label="Class"
            onChange={(e) =>
              setSearchFlight({
                ...searchFlight,
                classType: e.target.value,
              })
            }
          >
            {SEAT_CLASS.map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Number of TravellersNumber of Travellers */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Travellers</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchFlight.numOfTravellers}
            label="Travellers"
            onChange={(e) =>
              setSearchFlight({
                ...searchFlight,
                numOfTravellers: e.target.value,
              })
            }
          >
            {NUM_OFTRAVELLERS.map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Search btn */}
      <div className="w-full h-8">
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
          variant="contained"
          className="float-right"
        >
          Search
        </Button>
      </div>

      {/* Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Note archived"
        // action={action}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SearchInput;
