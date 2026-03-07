import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const register = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        setUser({ id: data._id, name: data.name, email: data.email })
        localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email }))
        return data
      } else {
        throw new Error(data.error || "Registration failed")
      }
    } catch (error) {
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      // For now, we'll register as login (backend needs proper login endpoint)
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: email, email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        setUser({ id: data._id, name: data.name, email: data.email })
        localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email }))
        return data
      } else {
        throw new Error(data.error || "Login failed")
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }))
    localStorage.setItem("user", JSON.stringify({
      ...user,
      ...updates
    }))
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
