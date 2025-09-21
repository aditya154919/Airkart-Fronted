import { createContext, useState, useEffect, useContext } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passenger, setPassenger] = useState(1);
  const [city, setCity] = useState("");
  const [discount, setDiscount] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [age, setAge] = useState();
  const [passno, setPassno] = useState("");
  const [gender, setGender] = useState("");
  const [bookedTickets, setBookedTickets] = useState(null);

  const fetchFlights = async () => {
    if (!from || !to || !date) {
      console.log("Missing required fields");
      return;
    }

    try {
      setLoading(true);
      // const response = await fetch(
      //   `http://localhost:5000/api/flights?from=${from}&to=${to}&outbound_date=${date}&return_date=${returnDate || ""}`
      // );

      const response = await fetch(
        `https:///airkart-backend.onrender.com/api/flights?from=${from}&to=${to}&outbound_date=${date}&return_date=${
          returnDate || ""}`
      );

      // console.log(response)

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const result = await response.json();
      setFlights(
        result.other_flights || result.best_flights || result.airports || []
      ); // ✅ store in state
      setCity(result.airports);
      console.log("Fetch citys:", result.airports);
      console.log(
        "Fetched flights:",
        result.other_flights || result.best_flights || result.airports
      );
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only run when from/to/date changes
  useEffect(() => {
    fetchFlights();
  }, [from, to, date]);

  return (
    <FlightContext.Provider
      value={{
        flights,
        loading,
        discount,
        setDiscount,
        from,
        setFrom,
        to,
        setTo,
        date,
        setDate,
        city,
        setCity,
        setLoading,
        returnDate,
        setReturnDate,
        fetchFlights,
        passenger,
        setPassenger,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        age,
        setAge,
        passno,
        setPassno,
        mail,
        setMail,
        gender,
        setGender,
        bookedTickets,
        setBookedTickets,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

// Custom hook
export const useFlights = () => useContext(FlightContext);
