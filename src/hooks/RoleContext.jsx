import { useState } from "react";
import { createContext , useContext } from "react";

const RoleContext = createContext(undefined);


export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
      throw new Error('useRoleContext must be used within a RoleProvider');
    }
    return context;
  };



  export const RoleProvider = (children) => {
    const [role , setrole] = useState("");
  
    return (
      <RoleContext.Provider value={{role,setrole}}>
        {children}
      </RoleContext.Provider>
    );
  };
  