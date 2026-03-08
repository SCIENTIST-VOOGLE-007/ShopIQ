import { createContext, useState, useEffect } from "react"
import { registerUserApi, loginUserApi, updateProfileApi } from "../services/api"

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
      const res = await registerUserApi(name, email, password)
      const data = res.data
      setUser({ id: data._id, name: data.name, email: data.email, profile: data.profile })
      localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email, profile: data.profile }))
      return data
    } catch (error) {
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      const res = await loginUserApi(email, password)
      const data = res.data
      setUser({ id: data._id, name: data.name, email: data.email, profile: data.profile })
      localStorage.setItem("user", JSON.stringify({ id: data._id, name: data.name, email: data.email, profile: data.profile }))
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (updates) => {
    try {
      if (!user || !user.id) throw new Error("No user logged in")

      // if caller passed a full user object (e.g. result from getProfileApi)
      if (updates && updates._id && updates.profile) {
        const normalized = {
          id: updates._id,
          name: updates.name,
          email: updates.email,
          profile: updates.profile
        }
        setUser(normalized)
        localStorage.setItem("user", JSON.stringify(normalized))
        return normalized
      }

      const res = await updateProfileApi(user.id, updates)
      const data = res.data
      const normalized = {
        id: data._id,
        name: data.name,
        email: data.email,
        profile: data.profile
      }
      setUser(normalized)
      localStorage.setItem("user", JSON.stringify(normalized))
      return normalized
    } catch (err) {
      console.error("updateProfile error", err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
