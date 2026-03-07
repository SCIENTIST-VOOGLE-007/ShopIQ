import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Assistant from "./pages/Assistant"
import Dashboard from "./pages/Dashboard"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"

function App() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (

      <div className="app-container">

        {/* NAVBAR */}

        <nav className="navbar">

          <Link to="/" className="logo-link">
            <div className="logo">ShopIQ</div>
          </Link>

          <div className="nav-links">

            {user ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/assistant">Assistant</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">Orders</Link>
                <span className="user-info">{user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}

          </div>

        </nav>

        {/* ROUTES */}

        <div className="page-wrapper">

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

          </Routes>

        </div>

      </div>

  )
}

export default App
