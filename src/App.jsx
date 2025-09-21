
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Flights from "./Pages/Flights";
import AboutFlightDetails from "./Pages/Passengerform";
import ChooseFlight from "./Components/chooseFlight";
import BookedTicket from "./Pages/BookedTicket";
import { BiBrightness } from "react-icons/bi";

const App = () => {
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const isHome = location.pathname === "/chooseflight";

  const backgroundStyle = !isHome
    ? { backgroundImage: "url('/assets/vvv.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }
    : {
      backgroundImage:
       "url('/assets/vvv.jpeg')", backgroundSize: "cover", backgroundPosition: "center ",
      };

  return (
    <div
      className="min-h-fit w-full bg-cover bg-center flex flex-col"
      style={backgroundStyle}
    >
      
      <Navbar openNav={openNav} setOpenNav={setOpenNav} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className=" px-5 py-10  overflow-y-auto"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home openNav={openNav} setOpenNav={setOpenNav} />} />
            <Route path="/about" element={<About />} />
            <Route path="/chooseflight" element={<ChooseFlight />} />
            <Route path="/bookedticket" element={<BookedTicket/>} />
            <Route path="/flightdetails" element={<AboutFlightDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/flight" element={<Flights />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;



