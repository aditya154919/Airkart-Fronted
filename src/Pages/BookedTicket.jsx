import React from "react";
import { useFlights } from "../Context/ApiContext";
import Barcode from "react-barcode";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { QrCode } from "lucide-react";

// Helper functions
const getRandomSeat = () => {
  const row = Math.floor(Math.random() * 30) + 1; // Rows 1–30
  const cols = ["A", "B", "C", "D", "E", "F"];
  const col = cols[Math.floor(Math.random() * cols.length)];
  return `${row}${col}`;
};

const getRandomGate = () => `G${Math.floor(Math.random() * 20) + 1}`;
const getRandomTerminal = () => `T${Math.floor(Math.random() * 3) + 1}`;

const BookedTicket = () => {
  const { bookedTickets } = useFlights();

  if (!bookedTickets || !bookedTickets.flight) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        No booked tickets yet.
      </div>
    );
  }

  const {
    flight,
    passengers,
    total,
    departureCity,
    arrivalCity,
    flightLogo,
    departureTime,
    arrivalTime,
  } = bookedTickets;

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
        Boarding Pass
      </h1>

      {passengers.map((p, idx) => {
        const seat = getRandomSeat();
        const gate = getRandomGate();
        const terminal = getRandomTerminal();

        const barcodeValue = `Name:${p.firstName} ${p.lastName}/${flight?.flight_number}/${seat}`;

        // console.log(barcodeValue);


        return (
          <motion.div
            key={idx}
            className=" w-5xl  bg-white rounded-2xl shadow-2xl mb-8 flex flex-col justify-center md:flex-row "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Left Stripe */}
            <div className="w-12 rounded-l-2xl bg-blue-600 flex-shrink-0"></div>

            {/* Main Ticket */}
            <div className="flex-1 p-6 relative">
              {/* Airline & Flight */}
              <div className="flex justify-between items-center border-b pb-3 mb-1">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={flightLogo}
                    alt=""
                    className="max-h-8 max-w-11 object-contain shrink-0"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{flight?.airline}</h2>
                    <p className="text-gray-500 font-semibold">
                      {flight?.flight_number}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {departureCity} <span className="text-gray-500">→</span>{" "}
                    {arrivalCity}
                  </p>
                  <p className="text-gray-500">
                    {departureTime} - {arrivalTime}
                  </p>
                </div>
              </div>

              {/* Passenger & Seat Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <span className="font-semibold">Name:</span> {p.firstName}{" "}
                    {p.lastName}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {p.age}
                  </p>
                  <p>
                    <span className="font-semibold">Gender:</span> {p.gender}
                  </p>
                  <p>
                    <span className="font-semibold">Aadhar No:</span>{" "}
                    {p.passport}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Seat:</span> {seat}
                  </p>
                  <p>
                    <span className="font-semibold">Gate:</span> {gate}
                  </p>
                  <p>
                    <span className="font-semibold">Terminal:</span> {terminal}
                  </p>
                  <p>
                    <span className="font-semibold">Class:</span> Economy
                  </p>
                </div>
              </div>

              {/* Total Paid */}
              <div className="border-t pt-2 mt-2">
                <p className="text-lg font-semibold text-purple-700">
                  Total Paid: ₹{total.toFixed(2)}
                </p>
              </div>

              {/* Perforation line */}
              <div className="my-4 relative">
                <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-gray-400 transform -translate-y-1/2"></div>
              </div>

              {/* Barcode */}
              <div className="flex justify-center mt-4">
                <Barcode
                  value={barcodeValue}
                  format="CODE128"
                  width={2}
                  height={60}
                  displayValue={false}
                />
                
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BookedTicket;
