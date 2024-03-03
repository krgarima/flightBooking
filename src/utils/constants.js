import dayjs from "dayjs";

const DEFAULT_SEARCH_FLIGHT = {
  origin: "",
  destination: "",
  tripType: "oneWay",
  numOfTravellers: 1,
  classType: "economy",
  originDate: null,
  returnDate: null,
};

const NUM_OFTRAVELLERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PLACES = ["Mumbai", "Delhi", "Chennai", "Bangalore", "Kolkata"];
const AIRLINES_LIST = {
  IndiGo: true,
  "Air India": true,
  GoAir: true,
  SpiceJet: true,
  Vistara: true,
  AirAsia: true,
};

const SEAT_CLASS = ["economy", "business", "first"];

export {
  DEFAULT_SEARCH_FLIGHT,
  NUM_OFTRAVELLERS,
  PLACES,
  AIRLINES_LIST,
  SEAT_CLASS,
};
