import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {  HashRouter } from "react-router-dom";
import "./index.css"; 

import { FlightProvider } from "./Context/ApiContext";
import { AppcontextProvider } from "./Context/Appcontext";




ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
   <AppcontextProvider>
   <FlightProvider>
   <App/>
   </FlightProvider>
   </AppcontextProvider>
   
  </HashRouter>
);
