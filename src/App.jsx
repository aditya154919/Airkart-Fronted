
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Flights from "./Pages/Flights";
import AboutFlightDetails from "./Pages/Passengerform";
import ChooseFlight from "./Components/ChooseFlight";
import BookedTicket from "./Pages/BookedTicket";
import SignIn from "./Authentication/SignIn";
import TermsAndConditions from "./Pages/TermsAndConditions";
import CancellationRefund from "./Pages/CancellationRefund";
import ShippingPolicy from "./Pages/ShippingPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Resetpass from "./Authentication/Resetpass";

// import { LogIn } from "lucide-react";
// import Emailverify from "./Authentication/Emailverify";


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
            {/* // <Route path="/auth" element={<Auth/>}/> */}
            <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
            <Route path="/cancellation-refund" element={<CancellationRefund/>}/>
            <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/flightdetails" element={<AboutFlightDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/flight" element={<Flights />} />
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/resetpass" element={<Resetpass/>}/>
           
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;



