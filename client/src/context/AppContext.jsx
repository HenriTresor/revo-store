// import React from 'react'

import { createContext, useEffect, useState } from "react"


export const AppData = createContext({})
const AppContext = ({ children }) => {
    
    const [cartItemsNumber, setCartItemsNumber] = useState(0)
    const [cart, setCart] = useState([])
    const values = {
        cartItemsNumber,
        setCartItemsNumber,
        cart,
        setCart
    };

    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart',[''])
        }
    },[])
    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])
    
    useEffect(() => {
        setCartItemsNumber(cart?.length)
    },[cart])
  return (
      <AppData.Provider
      value={values}
      >{children}</AppData.Provider>
  )
}

export default AppContext