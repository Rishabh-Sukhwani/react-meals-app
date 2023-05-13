import React, {useContext, useEffect} from 'react'

const AppContext = React.createContext()

const fetchData = async() => {
    try {
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const AppProvider = ({ children }) => {

    useEffect(() => {

        fetchData( )

    }, [])


    return (  
        <AppContext.Provider value={{name: 'john', role:'student'}}>
            {children}
        </AppContext.Provider>      
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    return useContext(AppContext) 
}
 
export {AppContext, AppProvider};