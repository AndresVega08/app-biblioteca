import { createContext, useState } from "react";

const AsideContext = createContext();

const AsideProvider = ({children}) =>{
    const [isAsideOpen, setIsAsideOpen] = useState(
        localStorage.getItem('isAsideOpen') === 'true'
    );

    const toggleAside = () => {
        const newIsAsideOpen = !isAsideOpen;
        setIsAsideOpen(newIsAsideOpen);
        localStorage.setItem('isAsideOpen', String(newIsAsideOpen));
    }

    return(
        <AsideContext.Provider value={{isAsideOpen, toggleAside}}>
            {children}
        </AsideContext.Provider>
    );
}

export {AsideProvider, AsideContext};