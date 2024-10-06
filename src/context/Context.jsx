import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        appointments,
        setAppointments,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
