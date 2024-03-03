import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import useStore from "../zustand/store";
import { formatNameBySlicing } from "../utils/helpers";

// eslint-disable-next-line react/prop-types
const FlightDetailsCard = ({ flight }) => {
  const {
    airline,
    duration,
    price,
    origin,
    destination,
    departureTime,
    arrivalTime,
  } = flight;

  const { searchFlight } = useStore();
  const { classType, numOfTravellers } = searchFlight;

  // eslint-disable-next-line react/prop-types
  const splitDepartureTime = departureTime?.split("T");
  const departureDate = splitDepartureTime[0];
  const departingTime = splitDepartureTime[1];
  // eslint-disable-next-line react/prop-types
  const splitArrivalTime = arrivalTime?.split("T");
  const arrivingTime = splitArrivalTime[1];

  if (Object.keys(flight).length === 0) return null;

  return (
    <div className="h-auto w-full mb-4 p-4 bg-slate-100 relative rounded-lg ">
      <h2>{airline}</h2>
      <div className="flex py-1">
        <div className="h-full flex-1 flex justify-between pr-2">
          <div className=" h-full flex flex-col justify-center">
            <h3 className="py-1 text-gray-500">{origin}</h3>
            <h4 className="font-semibold text-2xl">
              {formatNameBySlicing(origin)}
            </h4>
            <h5 className="text-gray-500">{departingTime}</h5>
          </div>
          <div className=" h-full flex flex-col justify-center items-center">
            <h3 className="py-1 font-semibold ">{departureDate}</h3>
            <h4 className="rotate-90">
              <AirplanemodeActiveIcon />
            </h4>
            <h5 className="font-semibold">{duration}</h5>
          </div>
          <div className=" h-full flex flex-col justify-center items-center">
            <h3 className="py-1 text-gray-500">{destination}</h3>
            <h4 className="font-semibold text-2xl">
              {formatNameBySlicing(destination)}
            </h4>
            <h5 className="text-gray-500">{arrivingTime}</h5>
          </div>
        </div>
        <div className="h-full w-10 m-auto sm:w-20 flex flex-col justify-evenly items-center sm:border-l-2 sm:p-2">
          <p className="text-green-500 font-bold">₹{price}</p>
          <p>/pax</p>
        </div>
      </div>

      <div className="mb-4">
        <PersonIcon /> {classType} Class | {numOfTravellers} Seat
        {numOfTravellers > 1 ? "s" : ""}
      </div>
      <Button className="w-full" variant="outlined">
        Select
      </Button>
    </div>
  );
};

export default FlightDetailsCard;
