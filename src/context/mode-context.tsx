import { createContext, useState } from "react"

export const ModeContext = createContext({
    isDarkMode: true,
    toggleMode: () => {}
})

export const ModeContextProvider = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleMode = () =>{
        setIsDarkMode(prev => !prev);
    }
    return <ModeContext.Provider value={{isDarkMode, toggleMode}}>{children}</ModeContext.Provider>
}