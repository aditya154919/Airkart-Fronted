import React, { useContext, useState } from "react";
import axios from "axios";
import { MdAirplaneTicket, MdPayment } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/Appcontext";

const SignIn = () => {
  const { loggedIn, setLoggedIn, user, setUser, backendurl } = useContext(Appcontext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clickhandler = () => {
    navigate("/resetpass");
  };

  const toggleForm = () => {

    if(!user){
    setLoggedIn(!loggedIn);
    setFormData({ name: "", email: "", password: "" });
    setMessage("");
    }
    
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      axios.defaults.withCredentials = true;

      const url = loggedIn
        ? `https://airkart-backend.onrender.com/api/v1/login`
        : `https://airkart-backend.onrender.com/api/v1/signup`;

      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials:true,
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        setMessage(
          loggedIn
            ? "✅ Login successful! Redirecting..."
            : "✅ Account created successfully! Redirecting..."
        );

      
        setLoading(false);
        

        
        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigate("/");
      } else {
        setMessage(data.message || "Failed. Try again!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message);
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-[900px] bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <div className="bg-orange-600 text-white w-1/2 flex flex-col justify-center items-start gap-10 px-10 py-12">
          <div className="flex items-center gap-3 text-2xl font-medium">
            <MdAirplaneTicket className="text-4xl bg-white/20 p-1 rounded-full" />
            Fast & easy flight bookings
          </div>
          <div className="flex items-center gap-3 text-2xl font-medium">
            <MdPayment className="text-4xl bg-white/20 p-1 rounded-full" />
            Seamless & secure payments
          </div>
          <div className="flex items-center gap-3 text-2xl font-medium">
            <FaSuitcase className="text-4xl bg-white/20 p-1 rounded-full" />
            Manage trips & get instant tickets
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            {loggedIn
              ? "Log in to Airkart ✈️"
              : "Create your Airkart Account 🚀"}
          </h2>

          <AnimatePresence mode="wait">
            <motion.form
              key={loggedIn ? "login" : "signup"}
              initial={{ opacity: 0, x: loggedIn ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: loggedIn ? -100 : 100 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {!loggedIn && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />

              {loggedIn && (
                <p
                  className="text-blue-500 cursor-pointer text-[15px]"
                  onClick={clickhandler}
                >
                  Forgot password ?
                </p>
              )}

              <button
                type="submit"
                className="bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition"
                disabled={loading}
              >
                {loading ? "Please wait..." : loggedIn ? "Login" : "Sign Up"}
              </button>
            </motion.form>
          </AnimatePresence>

          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("Success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="text-center mt-6 text-gray-700">
            {loggedIn ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-orange-600 font-semibold hover:underline"
            >
              {loggedIn  ? "Sign Up" : "Login"}
            </button>
          </div>

          <p className="text-[13px] mt-5 text-gray-500 ">
            This website is only for testing purpose — how a real flight ticket
            booking system works.{" "}
            <a
              className="border-b-[1px] text-orange-600 cursor-pointer"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy policy
            </a>{" "}
            and{" "}
            <a
              className="text-orange-600 border-b-[1px] cursor-pointer"
              onClick={() => navigate("/terms-and-conditions")}
            >
              Terms and conditions
            </a>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
