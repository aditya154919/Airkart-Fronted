
import React from "react";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFlights } from "../Context/ApiContext";

const FlightCard = ({ flight, item, city }) => {
  const navigate = useNavigate();
  const { from, to } = useFlights();

  // City names 
  const departureCity = city?.[0]?.departure?.[0]?.city || "Unknown";
  const arrivalCity = city?.[0]?.arrival?.[0]?.city || "Unknown";

  function clickHandler() {
    navigate("/chooseflight", { state: { flight, item } });
  }

  return (
    <div
      className="flex flex-col p-5 rounded-2xl backdrop-blur-2xl shadow-xl w-[550px] bg-white/70 cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border border-gray-200"
      onClick={clickHandler}
    >
      {/* Airline + Price */}
      <div className="flex  flex-row justify-between items-center mb-1">
        <div className="flex flex-row gap-2 items-center text-2xl">
          <img
            src={item.airline_logo}
            alt="airline"
            className="max-h-5 max-w-8 object-contain shrink-0"
          />
          <p className="text-lg font-semibold">{flight?.airline || "Unknown Airline"}</p>
          <p className="text-sm text-gray-700">{flight?.flight_number || "N/A"}</p>
        </div>
        <div className="text-2xl font-bold text-green-700">
          ₹{item?.price ? Math.floor((item.price * 88) / 2) : "—"}
        </div>
      </div>

      <div className="border-b border-gray-300 mb-2"></div>

      {/* From / To */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">{from || "—"}</h1>
        </div>
        <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-400"></div>
        <div className="flex flex-col items-end">
          <h1 className="text-3xl font-bold">{to || "—"}</h1>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 w-[50%]">{item?.flights && item.flights.length > 0
            ? item.flights[0]?.departure_airport?.name ||
              "—"
            : "0"}</p>
        <p className="text-sm text-gray-500 text-right w-[50%]">{item?.flights && item.flights.length > 0
            ? item.flights[item.flights.length - 1]?.arrival_airport?.name ||
              "—"
            : "0"}</p>
      </div>

      {/* Times + Duration */}
      <div className="flex flex-row justify-between items-center mt-2">
        <h1 className="text-lg flex flex-row gap-1 items-center font-medium">
          <MdFlightTakeoff className="text-blue-500 text-2xl" />
          {flight?.departure_airport?.time
            ? new Date(flight.departure_airport.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "—"}
        </h1>

        <div className="text-center text-gray-700">
          <p className="text-sm text-gray-500">
            {item?.total_duration
              ? `${Math.floor(item.total_duration / 60)}h ${item.total_duration % 60}m`
              : "N/A"}
          </p>

          <p className="text-xs text-gray-500">
            {item?.layovers && item.layovers.length > 0
              ? `${item.layovers.length} Stop${item.layovers.length > 1 ? "s" : ""}`
              : "Non-stop"}
          </p>
        </div>

        <h1 className="text-lg flex flex-row gap-1 items-center font-medium">
          <MdFlightLand className="text-red-600 text-2xl" />
          {flight?.arrival_airport?.time
            ? new Date(flight.arrival_airport.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "—"}
        </h1>
      </div>
    </div>
  );
};

export default FlightCard;
