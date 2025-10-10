import { createContext, useState } from "react";


export const Appcontext = createContext();


export const AppcontextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL; 
  const [isLoggedIn, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [state,setState] = useState("Signup");

  const value = {
    backendurl,
    isLoggedIn,
    setIsLogin,
    user,
    setUser,
    state,
    setState
  };

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};
