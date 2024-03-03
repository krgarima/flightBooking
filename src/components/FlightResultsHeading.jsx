import useStore from "../zustand/store";
import { formatNameBySlicing } from "../utils/helpers";

// eslint-disable-next-line react/prop-types
const FlightResultsHeading = ({ type }) => {
  const { searchFlight } = useStore();

  return (
    <div className="h-16 text-xl w-full flex flex-col justify-evenly items-center border py-4">
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
