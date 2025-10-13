import React, { useContext, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlights } from "../Context/ApiContext";
import { TbPointFilled } from "react-icons/tb";
import { GiSchoolBag } from "react-icons/gi";
import { BsFillSuitcaseFill } from "react-icons/bs";
import { Appcontext } from "../Context/Appcontext";

const ChooseFlight = () => {
  const { city, discount, setDiscount } = useFlights();
  const location = useLocation();
  const { flight, item } = location.state || {};

  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(Appcontext);

  if (!flight) return <p>No flight selected</p>;

  const departureCity = city?.[0]?.departure?.[0]?.city || "Unknown";
  const arrivalCity = city?.[0]?.arrival?.[0]?.city || "Unknown";

  const departureDate = flight?.departure_airport?.time
    ? new Date(flight.departure_airport.time).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "UNKNOWN";

  const [selected, setSelected] = useState("");

  const offers = [
    {
      code: "INSTANT",
      discount: "₹305 Off",
      chutt: 305,
      description:
        "Coupon applied! Enjoy an instant discount of ₹305 and receive a Hotel discount code after your booking.",
      color: "text-green-600",
    },
    {
      code: "NEWFLY",
      discount: "₹190 Off + ₹238",
      chutt: 428,
      description:
        "Get an instant discount of ₹190 on this booking and ₹238 ixigo money post this booking. Use it 100% on next booking.",
      color: "text-gray-700",
    },
    {
      code: "IXYESD",
      discount: "₹465 Off",
      chutt: 465,
      description: "Get flat 8% Off up to ₹750 with Yes Bank Credit Card",
      color: "text-gray-700",
    },
  ];

  function discountHandler(offers) {
    setDiscount(offers.chutt);
  }

  // time calculation
  const formatDuration = (minutes) => {
    if (!minutes) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  function clickHandler() {
    while (!loggedIn) {
      alert("Login in first!");
      return;
    }
    navigate("/flightdetails", { state: { flight, item } });
  }

  return (
    <div className="p-5  rounded-2xl  backdrop-blur-lg">
      <div className="flex flex-row gap-2 text-5xl items-center font-semibold mb-1 ">
        <h1 className="text-gray-800">{departureCity}</h1>
        <GoArrowRight className="mt-1 text-shadow-gray-700" />
        <h1 className="text-gray-800">{arrivalCity}</h1>
      </div>

      <div className="flex flex-row text-lg items-center gap-1 text-gray-600">
        {departureDate}
        <TbPointFilled />
        <p>
          {item?.layovers && item.layovers.length > 0
            ? item.layovers.length + " stops"
            : "Non stop"}
        </p>
      </div>

      
      {item?.flights && item.flights.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-10 ">
          {item.flights.map((data, index) => (
            <React.Fragment key={index}>
             
              <div className="flex flex-row items-center bg-white/70 justify-between p-5 rounded-2xl backdrop-blur-2xl shadow-xl w-[650px] h-[120px] cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
               
                <div className="flex flex-row gap-1 items-center">
                  <img
                    src={item.airline_logo}
                    className="max-h-8 max-w-11 object-contain shrink-0"
                    alt="airline"
                  />
                  <div className="flex flex-col items-center">
                    <h2 className="font-semibold text-xl">{data?.airline}</h2>
                    <h2>{data?.flight_number}</h2>
                  </div>
                </div>

                
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="text-xl font-semibold">
                    {data?.departure_airport?.time
                      ? new Date(
                          data.departure_airport.time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "—"}
                  </h1>
                  <h1 className="font-semibold">
                    {data?.departure_airport?.id}
                  </h1>
                </div>

                
                <div className="flex flex-col gap-[2px] items-center">
                  <div className="text-lg font-sans">
                    {data?.duration ? formatDuration(data.duration) : "N/A"}
                  </div>
                  <div className="leading-1.5 text-gray-500">----------</div>
                  <h1 className="text-gray-700">Flight</h1>
                </div>

               
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="text-xl font-semibold">
                    {data?.arrival_airport?.time
                      ? new Date(data.arrival_airport.time).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )
                      : "—"}
                  </h1>
                  <h1 className="font-semibold">{data?.arrival_airport?.id}</h1>
                </div>

               
                {index === 0 && (
                  <div className="items-center text-3xl font-semibold">
                    ₹{item?.price ? Math.floor((item.price * 88) / 2) : "—"}
                  </div>
                )}
              </div>

              
              {index < item.flights.length - 1 && item.layovers[index] && (
                <div className="flex flex-col items-center justify-center p-4 rounded-xl  bg-white/60 shadow-md w-[400px] text-center">
                  <p className="text-lg font-serif">
                    Layover at {item.layovers[index]?.name || "Unknown"}
                  </p>
                  <p className="text-gray-700">
                    Duration: {formatDuration(item.layovers[index]?.duration)}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        // Non-stop case
        <div className="flex flex-row items-center justify-between mt-10 p-5 rounded-2xl backdrop-blur-xl shadow-xl w-[700px] h-[120px] cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          <div className="flex fle-row gap-1 items-center">
            <img
              src={item.airline_logo}
              className="max-h-8 max-w-11 object-contain shrink-0"
              alt="airline"
            />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-xl">{flight?.airline}</h2>
              <h2>{flight?.flight_number}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-semibold">
              {flight?.departure_airport?.time
                ? new Date(flight.departure_airport.time).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )
                : "—"}
            </h1>
            <h1>{flight?.departure_airport?.id}</h1>
          </div>

          <div className="flex flex-col gap-[2px] items-center">
            <div className="text-lg font-sans">
              {item?.total_duration
                ? formatDuration(item.total_duration)
                : "N/A"}
            </div>
            <div className="leading-1.5 text-gray-500">----------</div>
            <h1 className="text-gray-700">Non Stop</h1>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-semibold">
              {flight?.arrival_airport?.time
                ? new Date(flight.arrival_airport.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "—"}
            </h1>
            <h1>{flight?.arrival_airport?.id}</h1>
          </div>

          <div className="items-center text-3xl font-semibold">
            ₹{item?.price ? Math.floor((item.price * 88) / 2) : "—"}
          </div>
        </div>
      )}

     
      <div className="flex flex-col gap-1 p-2 mt-4 text-lg text-gray-700">
        <p className="text-xl"> Class: {flight?.travel_class}</p>
        <p className="flex flex-row items-center gap-2">
          <BsFillSuitcaseFill /> Check-in: 15kg per piece, 1piece per adult
        </p>
        <p className="flex flex-row items-center gap-2">
          <GiSchoolBag /> Cabin: 7 kg per adult
        </p>
      </div>

      {/* Offers */}
      <div className="mt-4">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 px-1">
          Offers For You
        </h2>

        <input
          type="text"
          placeholder="Have a promocode? Redeem here"
          className="p-4 px-3 mb-5 text-sm text-gray-800 rounded-md border border-gray-600 backdrop-blur-xl shadow-xl w-[500px]"
        />

        <div className="space-y-4">
          {offers.map((offer) => (
            <label
              key={offer.code}
              className="flex flex-col border rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition w-full"
            >
              <div
                className="flex text-gray-800 justify-between items-center"
                onClick={() => discountHandler(offer)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="offer"
                    value={offer.code}
                    checked={selected === offer.code}
                    onChange={() => setSelected(offer.code)}
                    className="w-5 h-5 text-green-400 border-gray-300"
                  />
                  <span className="font-bold">{offer.code}</span>
                </div>
                <span className="font-semibold">{offer.discount}</span>
              </div>

              <p className="mt-1 text-md text-black">{offer.description}</p>
              <p className="text-sm text-blue-600 underline cursor-pointer mt-1">
                Know More
              </p>
            </label>
          ))}
        </div>
      </div>

      <div
        className="w-[180px] flex items-center gap-2 mt-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer shadow-lg text-lg"
        onClick={clickHandler}
      >
        Procced to pay
      </div>
    </div>
  );
};

export default ChooseFlight;
