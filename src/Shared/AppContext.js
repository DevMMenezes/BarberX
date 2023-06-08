import { createContext, useState } from "react";

const AppContext = createContext(0);

export const AppContextProvider = ({ children }) => {
  const [CurrentScreen, setCurrentScreen] = useState("Home");
  const [Barbers, setBarbers] = useState([]);

  return (
    <AppContext.Provider value={{CurrentScreen, setCurrentScreen,Barbers, setBarbers}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
