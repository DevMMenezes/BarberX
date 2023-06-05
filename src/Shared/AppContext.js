import { createContext, useState } from "react";

const AppContext = createContext(0);

export const AppContextProvider = ({ children }) => {
  const [CurrentScreen, setCurrentScreen] = useState("Home");

  return (
    <AppContext.Provider value={{CurrentScreen, setCurrentScreen}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
