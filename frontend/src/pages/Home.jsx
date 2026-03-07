import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Home() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="home-page" style={{ justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <div className="glass-card" style={{ maxWidth: "500px", textAlign: "center" }}>
          <h1 className="hero-title">Welcome to ShopIQ</h1>
          <p className="hero-subtitle">AI Powered Smart Shopping Companion</p>
          <div className="home-buttons">
            <Link to="/login">
              <button className="btn-primary">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn-secondary">Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="glass-card">
        <h1 className="hero-title">Welcome, {user.name}! 👋</h1>
        <p className="hero-subtitle">Ready for smarter shopping?</p>

        <div className="home-buttons" style={{ marginTop: "40px" }}>
          <Link to="/assistant">
            <button className="btn-primary">Start AI Shopping</button>
          </Link>
          <Link to="/dashboard">
            <button className="btn-secondary">View Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home