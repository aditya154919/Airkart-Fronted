
import { createContext, useState } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [loggedIn, setLoggedIn] = useState(false); 
  const [formMode, setFormMode] = useState("signup"); 
  const [user, setUser] = useState(null);

  const value = {
    backendurl,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    formMode,
    setFormMode,
  };

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};
