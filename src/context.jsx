import React, {useContext, useEffect, useState} from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)



    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const {data} = await axios(url)
            if (data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
            }
        } catch (e) {
            console.log(e.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])


    return (  
        <AppContext.Provider value={{ meals, loading }}>
            {children}
        </AppContext.Provider>      
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    return useContext(AppContext) 
}
 
export {AppContext, AppProvider};