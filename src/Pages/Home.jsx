
import React from "react";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFlights } from "../Context/ApiContext";

const Home = ({ openNav }) => {
  const navigate = useNavigate();

  const {
    from,
    setFrom,
    to,
    setTo,
    date,
    loading,
    setLoading,
    setDate,
    returnDate,
    city,
    setCity,
    setReturnDate,
    passenger,
    setPassenger,
    fetchFlights,
  } = useFlights();

  async function clickHandler() {
    if (!from || !to || !date) {
      alert("Please fill From, To and Date");
      return;
    }
    
    navigate("/flight");
    setLoading(true);
    await fetchFlights(); 
    setLoading(false)

      
  }

  return (
    <>
      {openNav ? (
        <div className="max-h-screen"></div>
      ) : (
        <div className="flex  md:ml-137">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl  md:p-9"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-serif text-gray-700 text-center mb-3"
            >
              Book your Ticket Now ✈️
            </motion.h1>

            {/* Search Card */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5  ">
                <div className="flex flex-col">
                  <label className="text-lg text-gray-600">From</label>
                  <div className="flex items-center bg-gray-200 p-3 rounded-lg">
                    <MdFlightTakeoff className="text-2xl text-gray-500 mr-2" />
                    <input
                      className="bg-transparent outline-none flex-1 uppercase"
                      required
                      type="text"
                      placeholder="Origin (e.g. DEL)"
                      value={from}
                      onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                {/* To */}
                <div className="flex flex-col">
                  <label className="text-lg text-gray-600">To</label>
                  <div className="flex items-center bg-gray-200 p-3 rounded-lg">
                    <MdFlightLand className="text-2xl text-gray-500 mr-2" />
                    <input
                      className="bg-transparent outline-none flex-1 uppercase"
                      required
                      type="text"
                      placeholder="Destination (e.g. BOM)"
                      value={to}
                      onChange={(e) => setTo(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
              </div>

              {/* Outbound Date */}
              <div>
                <label className="text-lg text-gray-600">Departure Date</label>
                <input
                  className="w-full bg-gray-200 p-3 rounded-lg text-gray-600 outline-none"
                  required
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Return Date */}
              {/* <div>
                <label className="text-lg text-gray-600">Return Date (optional)</label>
                <input
                  className="w-full bg-gray-200 p-3 rounded-lg outline-none"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div> */}

              {/* Travellers */}
              <div>
                <label className="text-lg text-gray-600">
                  Travellers - Economy
                </label>
                <div className="flex items-center bg-gray-200 p-3 rounded-lg">
                  <GoPeople className="text-2xl text-gray-500 mr-2" />
                  <input
                    className="bg-transparent outline-none flex-1 text-gray-600"
                    required
                    type="number"
                    min={1}
                    value={passenger || ""} 
                    onChange={(e) => setPassenger(e.target.value)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer shadow-lg text-lg"
                onClick={clickHandler}
              >
                <CiSearch className="text-2xl" />
                Search Flight
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Home;
