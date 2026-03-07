import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [user,setUser] = useState({
    name:"Guest",
    preferences:{},
    cart:[],
    orders:[]
  })

  const addToCart = (product) => {
    setUser(prev => ({
      ...prev,
      cart:[...prev.cart,product]
    }))
  }

  const removeFromCart = (id) => {
    setUser(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== id)
    }))
  }

  const addOrder = (order) => {
    setUser(prev => ({
      ...prev,
      orders:[...prev.orders,order]
    }))
  }

  return(
    <UserContext.Provider value={{
      user,
      setUser,
      addToCart,
      removeFromCart,
      addOrder
    }}>
      {children}
    </UserContext.Provider>
  )
}