
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdLockReset } from "react-icons/md";

const Resetpass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://airkart-backend.onrender.com/api/v1/send-reset-otp`,
        { email },
        { headers: { "Content-Type": "application/json" },withCredentials:true }
      );

      setMessage(response.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP!");
    } finally {
      setLoading(false);
    }
  };

  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://airkart-backend.onrender.com/api/v1/reset-pass`,
        { email, otp, newPassword },
        {withCredentials:true, headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen   ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-10 w-[400px] flex flex-col items-center"
      >
        <div className="text-center mb-5">
          <MdLockReset className="text-5xl text-orange-500 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {step === 1 ? "Reset Your Password" : "Enter OTP & New Password"}
          </h2>
          <p className="text-sm text-gray-500">
            {step === 1
              ? "Enter your email to get an OTP"
              : "Check your email for the OTP"}
          </p>
        </div>

        <form
          onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
          className="flex flex-col w-full gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step === 2}
          />

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : step === 1
              ? "Send OTP"
              : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p
          onClick={() => navigate("/login")}
          className="text-sm text-sky-600 cursor-pointer mt-4 hover:underline"
        >
          Back to Login
        </p>
      </motion.div>
    </div>
  );
};

export default Resetpass;
