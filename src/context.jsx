import React, {useContext, useEffect, useState} from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    


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

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if (favouriteMeal) {
            meal = favourites.find((meal) => meal.idMeal === idMeal)
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getFavouritesFromLocalStorage = () => {
        let favourites = localStorage.getItem('favourites');
        if (favourites) {
            favourites = JSON.parse(localStorage.getItem('favourites'))
        } else {
            favourites = []
        }
        return favourites
    }

    const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());

    const addToFavourites = (idMeal) => {
        const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
        if (alreadyFavourite) return
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const updatedFavourites = [...favourites, meal]
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal);
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])


    return (  
        <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addToFavourites, removeFromFavourites, favourites }}>
            {children}
        </AppContext.Provider>      
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
    return useContext(AppContext) 
}
 
export {AppContext, AppProvider};