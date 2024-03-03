// import React from "react";
import useStore from "../zustand/store";
import { formatNameBySlicing } from "../utils/helpers";

const FlightResultsHeading = ({ type }) => {
  const { searchFlight } = useStore();
  const { origin, destination } = searchFlight;

  return (
    <div className="h-16  w-full flex flex-col justify-evenly items-center border ">
      {type === "departure" ? (
        <p className="font-bold">
          {formatNameBySlicing(searchFlight?.origin)} -{" "}
          {formatNameBySlicing(searchFlight?.destination)}
        </p>
      ) : (
        <p className="font-bold">
          {formatNameBySlicing(searchFlight?.destination)} -{" "}
          {formatNameBySlicing(searchFlight?.origin)}
        </p>
      )}
      <p>06-02-2024</p>
    </div>
  );
};

export default FlightResultsHeading;
