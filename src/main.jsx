import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {  HashRouter } from "react-router-dom";
import "./index.css"; 

import { FlightProvider } from "./Context/ApiContext";




ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
   
   <FlightProvider>
   <App/>
   </FlightProvider>
   
  </HashRouter>
);
