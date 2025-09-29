import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {  HashRouter } from "react-router-dom";
import "./index.css"; 
import { ClerkProvider } from '@clerk/clerk-react'
import { FlightProvider } from "./Context/ApiContext";



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
   <FlightProvider>
   <App/>
   </FlightProvider>
   </ClerkProvider>
  </HashRouter>
);
