import { useEffect, useState } from "react";
import { createContext , useContext } from "react";

const RoleContext = createContext(undefined);


// eslint-disable-next-line react-refresh/only-export-components
export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
      throw new Error('useRoleContext must be used within a RoleProvider');
    }
    return context;
  };



  // eslint-disable-next-line react/prop-types
  export const RoleProvider = ({children}) => {
    const [role , setrole] = useState("");

    useEffect(() => {
      const tempRole = localStorage.getItem("Role");
      if(tempRole){
        setrole(tempRole);
      }
    },[])
  
    return (
      <RoleContext.Provider value={{role,setrole}}>
        {children}
      </RoleContext.Provider>
    );
  };
  