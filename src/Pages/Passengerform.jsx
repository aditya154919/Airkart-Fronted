
import React, { useState, useEffect } from "react";
import { useFlights } from "../Context/ApiContext";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Passengerform = () => {
  const { city, passenger, setPassenger, discount, setBookedTickets } = useFlights();
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, item } = location.state || {};

  const departureCity = city?.[0]?.departure?.[0]?.city || "Unknown";
  const arrivalCity = city?.[0]?.arrival?.[0]?.city || "Unknown";
  const flightLogo = item.airline_logo;
  const farePrice = item?.price || 0;
  const departureTime = item?.flights[0]?.departure_airport?.time;
  const arrivalTime = item?.flights?.[item.flights.length - 1]?.arrival_airport?.time;


  console.log(departureTime);
  console.log(arrivalTime)

  // Price calculation
  const basePrice = Math.floor((farePrice * 88) / 2);
  const gstRate = 0.07;
  const offer = discount || 0;
  const subtotal = passenger * basePrice;
  const gst = subtotal * gstRate;
  const total = subtotal + gst - offer;

  const [showPayment, setShowPayment] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });

 
  useEffect(() => {
    setPassengerData((prev) => {
      const newData = [...prev];
      while (newData.length < passenger) newData.push({});
      return newData.slice(0, passenger);
    });
  }, [passenger]);

 
  const handleInputChange = (index, field, value) => {
    const updated = [...passengerData];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerData(updated);
  };

 
  const plusHandler = () => setPassenger(passenger + 1);
  const minusHandler = () => passenger > 0 && setPassenger(passenger - 1);

  
  const paymentHandler = () => {
    for (let i = 0; i < passenger; i++) {
      const p = passengerData[i] || {};
      if (!p.firstName || !p.lastName || !p.email || !p.age || !p.gender || !p.passport) {
        alert(`Please fill all details for Passenger ${i + 1}`);
        return;
      }
    }
    setShowPayment((prev) => !prev);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const waitHandler = async () => {
  if (!selectedPayment) return alert("Please select a payment method.");
  if (!flight || !passengerData.length) return alert("Flight or passenger data missing!");

  // Start popup sequence
  setPopup({ show: true, message: "Processing payment..." });
  await delay(2000);

  setPopup({ show: true, message: "Payment Success ✅" });
  await delay(1200);

  // Save ticket
  if (typeof setBookedTickets === "function") {
    setBookedTickets({
      flight,
      passengers: 
      passengerData,
      total,
      departureCity,
      arrivalCity,
      flightLogo,
      departureTime,
      arrivalTime
    });
  } else {
    console.error("setBookedTickets is not defined!");
  }

  setPopup({ show: true, message: "Ticket has been sent to your mail 📧" });
  await delay(1200);

  setPopup({ show: false, message: "" });
  navigate("/"); // Redirect to Home
};


  return (
    <div className="min-h-screen py-10 px-6 relative">
      {/* Header */}
      <motion.div
        className="flex gap-2 justify-center items-center text-4xl md:text-5xl font-bold mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-blue-700">{departureCity}</h1>
        <GoArrowRight className="text-gray-700 mt-1" />
        <h1 className="text-purple-700">{arrivalCity}</h1>
      </motion.div>

      {/* Passenger Counter */}
      <motion.div className="flex justify-center items-center gap-6 mb-10">
        <button
          onClick={minusHandler}
          className="px-5 py-2 text-2xl rounded-lg shadow bg-blue-600 text-white hover:bg-blue-700"
        >
          -
        </button>
        <div className="text-xl font-semibold">
          Passenger: <span className="text-blue-700">{passenger}</span>
        </div>
        <button
          onClick={plusHandler}
          className="px-4 py-2 text-2xl rounded-lg shadow bg-blue-600 text-white hover:bg-blue-700"
        >
          +
        </button>
      </motion.div>

      {/* Passenger Forms */}
      {passenger > 0 ? (
        <div className="grid md:grid-cols-2  gap-6">
          {passengerData.map((_, idx) => (
            <motion.div key={idx} className="p-6 backdrop-blur-2xl bg-white/25 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Passenger {idx + 1}</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 border p-2 rounded-md"
                  onChange={(e) => handleInputChange(idx, "firstName", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex-1 border p-2 rounded-md"
                  onChange={(e) => handleInputChange(idx, "lastName", e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mt-3 rounded-md"
                onChange={(e) => handleInputChange(idx, "email", e.target.value)}
              />
              <div className="flex gap-3 mt-3">
                <input
                  type="number"
                  placeholder="Age"
                  className="flex-1 border p-2 rounded-md"
                  onChange={(e) => handleInputChange(idx, "age", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Gender"
                  className="flex-1 border p-2 rounded-md"
                  onChange={(e) => handleInputChange(idx, "gender", e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Aadhar No"
                className="w-full border p-2 mt-3 rounded-md"
                minLength={12}
                onChange={(e) => handleInputChange(idx, "passport", e.target.value)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">No passengers added yet.</div>
      )}

      {/* Payment Section */}
      {passenger > 0 && (
        <motion.div className="mt-12 max-w-2xl mx-auto">
          <div className="rounded-2xl shadow-2xl bg-gray-300 p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Summary</h2>
            <div className="flex justify-between text-lg">
              <span>Base Price:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>GST (7%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg text-green-700">
              <span>Discount Applied</span>
              <span>- ₹{offer}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-xl font-semibold text-purple-700">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={paymentHandler}
              className="min-w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg shadow-md"
            >
              {showPayment ? "Hide Payment Methods" : "Proceed to Payment"}
            </button>

            {/* Payment Methods */}
            {showPayment && (
              <div className="mt-6 p-6 rounded-xl shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
                <div className="space-y-3">
                  {["upi", "card", "netbanking", "wallet"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={waitHandler}
                  className="mt-5 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Popup Modal */}
      {popup.show && (
        <motion.div
          className="fixed inset-0 backdrop-blur-xl  bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl text-center w-[300px]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <p className="text-lg font-semibold">{popup.message}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Passengerform;




