import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Profile() {
  const { user, updateProfile } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [profile, setProfile] = useState({
    category: user?.category || "",
    budget: user?.budget || "",
    brand: user?.brand || "",
    preferences: user?.preferences || ""
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    updateProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleContinue = () => {
    navigate("/")
  }

  return (
    <div className="page">
      <div className="profile-container">
        <h1>Complete Your Profile</h1>
        <p className="subtitle">Help us personalize your shopping experience</p>

        <div className="glass-card profile-form">
          <div className="form-group">
            <label>Preferred Product Category</label>
            <input
              type="text"
              name="category"
              value={profile.category}
              onChange={handleChange}
              placeholder="e.g., Electronics, Fashion, Home"
            />
          </div>

          <div className="form-group">
            <label>Budget Range (₹)</label>
            <input
              type="number"
              name="budget"
              value={profile.budget}
              onChange={handleChange}
              placeholder="e.g., 50000"
            />
          </div>

          <div className="form-group">
            <label>Favorite Brand</label>
            <input
              type="text"
              name="brand"
              value={profile.brand}
              onChange={handleChange}
              placeholder="e.g., Samsung, Apple, Nike"
            />
          </div>

          <div className="form-group">
            <label>Shopping Preferences</label>
            <textarea
              name="preferences"
              value={profile.preferences}
              onChange={handleChange}
              placeholder="What matters to you? (e.g., Quality, Price, Brand reputation)"
              rows="4"
            ></textarea>
          </div>

          {saved && <div className="success-message">✓ Profile updated successfully</div>}

          <div className="button-group">
            <button className="btn-primary" onClick={handleSave}>
              Save Profile
            </button>
            <button className="btn-secondary" onClick={handleContinue}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
