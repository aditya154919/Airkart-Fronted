
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen py-5  sm:px-6 lg:px-10 ">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-md p-8 space-y-8 backdrop-blur-3xl ">
        <h1 className="text-4xl font-bold text-center text-blue-700">About Airkart</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-blue-600">Airkart</span>, your trusted travel companion. From booking flights to managing your tickets, we provide a seamless and hassle-free flight booking experience for travelers worldwide.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At Airkart, our mission is to make air travel easy, accessible, and enjoyable. We strive to provide users with real-time flight information, competitive fares, and smooth booking processes, so you can focus on the joy of traveling.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Why Choose Airkart?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Instant flight search and booking with multiple airlines</li>
            <li>Secure and fast online payment options</li>
            <li>Personalized tickets with passenger details and digital boarding pass</li>
            <li>Reliable customer support for all your travel needs</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a future where booking flights is as effortless as clicking a button. Airkart is committed to innovation, convenience, and providing a complete travel solution that saves time, reduces stress, and enhances your journey.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600 text-center">How Airkart Works</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="font-bold text-lg mb-2">1. Search Flights</h3>
              <p className="text-gray-700 text-sm">
                Enter your departure and arrival cities along with travel dates to find available flights.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="font-bold text-lg mb-2">2. Select Flight</h3>
              <p className="text-gray-700 text-sm">
                Choose the flight that fits your schedule and budget from a list of airlines.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="font-bold text-lg mb-2">3. Book & Pay</h3>
              <p className="text-gray-700 text-sm">
                Fill passenger details, select your seat, and securely pay online with multiple options.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="font-bold text-lg mb-2">4. Get Boarding Pass</h3>
              <p className="text-gray-700 text-sm">
                Receive your digital boarding pass instantly, ready for scanning at the airport.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Join the Airkart Community</h3>
          <p className="text-gray-700 mb-4">
            Whether you're a frequent flyer or planning your first trip, Airkart makes travel planning simple, fast, and reliable. Start your journey with us today!
          </p>
          <Link to={'/'}>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300">
              Book Your Flight
            </button>
          </Link>
        </div>

        <p className=" px-2 mt-5 text-center">
          Made by <span className="font-bold"> Aditya & Pradyuman❤️</span>
        </p>
      </div>
    </div>
  );
};

export default About;
