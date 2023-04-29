import { createContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { rootLink } from '../utils/links'

export const AuthData = createContext({
    currentUser: null,
    isLoggedIn: false
})
const AuthContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const values = {
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    }

    const token = localStorage.getItem('token')
    const { data, isLoading, error } = useFetch(`${rootLink}/api/v1/users/me`, token)
    // console.log(data);

    useEffect(() => {
        setCurrentUser(data?.user)
    }, [data])

    useEffect(() => {
        if(currentUser) setIsLoggedIn(true)
    },[currentUser])
    return (
        <AuthData.Provider value={values}>{children}</AuthData.Provider>
    )
}

export default AuthContext