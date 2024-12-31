import { useEffect, useState } from "react";
import { createContext , useContext } from "react";

const ThemContext = createContext(undefined);


export const useThemContext = () => {
    const context = useContext(ThemContext);
    if(context){
        return context;
    }else{
        throw new Error('useThemContext must be used within a RoleProvider');
    }
}

// eslint-disable-next-line react/prop-types
export const ThemProvider = ({children}) => {
    const [them , setthem] = useState("");
    useEffect(() => {
        const tempThem = localStorage.getItem("them");
        if(tempThem){
            if(tempThem === "dark"){
                document.body.classList.add("dark");
            }else{
                document.body.classList.remove("dark");
            }
            setthem(tempThem);
        }else{
            localStorage.setItem("them" , "light")
            setthem("light")
        }
    },[])
    return(
        <ThemContext.Provider value={{them , setthem}}>
            {children}
        </ThemContext.Provider>
    );
}