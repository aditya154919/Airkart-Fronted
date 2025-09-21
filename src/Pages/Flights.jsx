
import React from "react";
import FlightCard from "../Components/FlightCard";
import { useFlights } from "../Context/ApiContext";


const Flights = () => {
  const { flights, loading, city } = useFlights();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/public/assets/flght.gif"/>
      </div>
    );
  }

  return (
    <div className=" flex flex-wrap gap-5 items-center justify-center min-h-screen">
      {flights.length > 0 ? (
        flights
          ?.slice(0, 10)
          .map((item) =>
            item.flights.map((flight) => (
              <FlightCard
                // key={flight.flight_number} 
                flight={flight}
                city={city}
                item={item}
              />
            ))
          )
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold">No Flights Available</p>
          <p className="text-gray-500 mt-2 text-2xl">Try on Another Date</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
