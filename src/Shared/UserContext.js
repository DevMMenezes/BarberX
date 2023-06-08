import { createContext, useState } from "react";

const UserContext = createContext(0);

export const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState("");

  return (
    <UserContext.Provider value={{User, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
