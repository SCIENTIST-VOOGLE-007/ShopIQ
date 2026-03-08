import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Profile() {
  const { user, updateProfile } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    // Basic info
    ageGroup: user?.profile?.ageGroup || "",
    gender: user?.profile?.gender || "",
    occupation: user?.profile?.occupation || "",
    region: user?.profile?.region || "",
    
    // Budget
    budgetPreference: user?.profile?.budgetPreference || "",
    budgetMin: user?.profile?.budgetRange?.min || "",
    budgetMax: user?.profile?.budgetRange?.max || "",
    
    // Interests
    interests: user?.profile?.interests || [],
    preferredBrands: (user?.profile?.preferredBrands || []).join(", "),
    
    // Shopping behavior
    shoppingFrequency: user?.profile?.shoppingFrequency || "",
    confusionLevel: user?.profile?.confusionLevel || "",
    decisionMakers: user?.profile?.decisionMakers || [],
    
    // Values
    sustainability: user?.profile?.sustainability || false,
    supportLocal: user?.profile?.supportLocal || false,
    priceVsQuality: user?.profile?.priceVsQuality || "",
    
    // Additional context
    purpose: user?.profile?.purpose || "",
    usageDuration: user?.profile?.usageDuration || "",
    techSavviness: user?.profile?.techSavviness || ""
  })
  
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleInterestToggle = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleDecisionMakerToggle = (maker) => {
    setProfile(prev => ({
      ...prev,
      decisionMakers: prev.decisionMakers.includes(maker)
        ? prev.decisionMakers.filter(m => m !== maker)
        : [...prev.decisionMakers, maker]
    }))
  }

  const handleSave = async () => {
    try {
      // separate budget fields so we don't send them at root level
      const { budgetMin, budgetMax, ...rest } = profile
      const toSave = {
        ...rest,
        budgetRange: { min: Number(budgetMin) || 0, max: Number(budgetMax) || 0 }
      }
      await updateProfile(toSave)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error("Profile save failed", err)
      setSaved(false)
    }
  }

  const handleContinue = async () => {
    await handleSave()
    navigate("/dashboard")
  }

  const totalSteps = 5

  return (
    <div className="page">
      <div className="profile-container">
        <h1>Complete Your AI Shopping Profile</h1>
        <p className="subtitle">Help us personalize your shopping experience (Step {step} of {totalSteps})</p>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>

        <div className="glass-card profile-form">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="form-step">
              <h2>Who Are You?</h2>
              
              <div className="form-group">
                <label>Age Group</label>
                <select name="ageGroup" value={profile.ageGroup} onChange={handleChange}>
                  <option value="">Select age group</option>
                  <option value="13-18">13-18 (Teenager)</option>
                  <option value="19-25">19-25 (Young Adult)</option>
                  <option value="26-35">26-35 (Adult)</option>
                  <option value="36-50">36-50 (Mid-Career)</option>
                  <option value="50+">50+ (Senior)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={profile.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label>Occupation</label>
                <select name="occupation" value={profile.occupation} onChange={handleChange}>
                  <option value="">Select occupation</option>
                  <option value="Student">Student</option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Professional">Professional/Employee</option>
                  <option value="Self-employed">Self-employed/Entrepreneur</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              <div className="form-group">
                <label>Region</label>
                <select name="region" value={profile.region} onChange={handleChange}>
                  <option value="">Select region</option>
                  <option value="North">North India</option>
                  <option value="South">South India</option>
                  <option value="East">East India</option>
                  <option value="West">West India</option>
                  <option value="Northeast">Northeast India</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: BUDGET & SPENDING */}
          {step === 2 && (
            <div className="form-step">
              <h2>What's Your Budget?</h2>
              
              <div className="form-group">
                <label>Budget Preference</label>
                <select name="budgetPreference" value={profile.budgetPreference} onChange={handleChange}>
                  <option value="">Select budget range</option>
                  <option value="Low">Low (₹5K - ₹20K)</option>
                  <option value="Medium">Medium (₹20K - ₹50K)</option>
                  <option value="High">High (₹50K - ₹100K)</option>
                  <option value="Premium">Premium (₹100K+)</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Min Budget (₹)</label>
                  <input
                    type="number"
                    name="budgetMin"
                    value={profile.budgetMin}
                    onChange={handleChange}
                    placeholder="Minimum amount"
                  />
                </div>
                <div className="form-group">
                  <label>Max Budget (₹)</label>
                  <input
                    type="number"
                    name="budgetMax"
                    value={profile.budgetMax}
                    onChange={handleChange}
                    placeholder="Maximum amount"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Shopping Frequency</label>
                <select name="shoppingFrequency" value={profile.shoppingFrequency} onChange={handleChange}>
                  <option value="">Select frequency</option>
                  <option value="Rarely">Rarely (Few times a year)</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Very Frequent">Very Frequent (Multiple times per week)</option>
                </select>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="sustainability"
                    checked={profile.sustainability}
                    onChange={handleChange}
                  />
                  I prefer eco-friendly & sustainable products
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="supportLocal"
                    checked={profile.supportLocal}
                    onChange={handleChange}
                  />
                  I prefer supporting local & small sellers
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: INTERESTS & BRANDS */}
          {step === 3 && (
            <div className="form-step">
              <h2>What Interests You?</h2>
              
              <label>Select your interests (choose multiple):</label>
              <div className="interest-grid">
                {["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books", "Beauty", "Toys", "Appliances"].map((interest) => (
                  <button
                    key={interest}
                    className={`interest-btn ${profile.interests.includes(interest) ? "active" : ""}`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label>Preferred Brands (comma separated)</label>
                <input
                  type="text"
                  name="preferredBrands"
                  value={profile.preferredBrands}
                  onChange={handleChange}
                  placeholder="e.g., Apple, Samsung, Nike"
                />
              </div>

              <div className="form-group">
                <label>Price vs Quality Priority</label>
                <select name="priceVsQuality" value={profile.priceVsQuality} onChange={handleChange}>
                  <option value="">Select priority</option>
                  <option value="Price Priority">Price is my priority (budget-conscious)</option>
                  <option value="Balanced">Balanced (price and quality matter equally)</option>
                  <option value="Quality Priority">Quality is my priority (willing to spend more)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: SHOPPING BEHAVIOR */}
          {step === 4 && (
            <div className="form-step">
              <h2>How Do You Shop?</h2>
              
              <div className="form-group">
                <label>How confident are you about making purchasing decisions?</label>
                <select name="confusionLevel" value={profile.confusionLevel} onChange={handleChange}>
                  <option value="">Select confidence level</option>
                  <option value="Very Confident">Very Confident (I know exactly what I want)</option>
                  <option value="Confident">Confident (Usually have a clear idea)</option>
                  <option value="Neutral">Neutral (Sometimes unsure)</option>
                  <option value="Confused">Confused (Often overwhelmed by choices)</option>
                  <option value="Very Confused">Very Confused (Always need guidance)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Who influences your purchasing decisions?</label>
                <div className="checkbox-list">
                  {["Self", "Parents", "Friends", "Mentor/Expert", "Family Members", "Online Reviews"].map((maker) => (
                    <label key={maker}>
                      <input
                        type="checkbox"
                        checked={profile.decisionMakers.includes(maker)}
                        onChange={() => handleDecisionMakerToggle(maker)}
                      />
                      {maker}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>How tech-savvy are you?</label>
                <select name="techSavviness" value={profile.techSavviness} onChange={handleChange}>
                  <option value="">Select level</option>
                  <option value="Not at all">Not at all (Limited tech knowledge)</option>
                  <option value="Basic">Basic (Can use common apps)</option>
                  <option value="Average">Average (Comfortable with most tech)</option>
                  <option value="Advanced">Advanced (Technical skills)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: USAGE & PURPOSE */}
          {step === 5 && (
            <div className="form-step">
              <h2>What's Your Use Case?</h2>
              
              <div className="form-group">
                <label>What are you shopping for?</label>
                <select name="purpose" value={profile.purpose} onChange={handleChange}>
                  <option value="">Select purpose</option>
                  <option value="Personal use">Personal use</option>
                  <option value="Gift">Gift for someone</option>
                  <option value="Business">Business/Professional use</option>
                  <option value="Collection">Collection/Hobby</option>
                </select>
              </div>

              <div className="form-group">
                <label>How long do you expect to use this product?</label>
                <select name="usageDuration" value={profile.usageDuration} onChange={handleChange}>
                  <option value="">Select duration</option>
                  <option value="Short-term">Short-term (1-2 years)</option>
                  <option value="Medium">Medium-term (2-4 years)</option>
                  <option value="Long-term">Long-term (5+ years)</option>
                </select>
              </div>

              <div className="info-box">
                <h3>✨ What We'll Do With This Information</h3>
                <ul>
                  <li>🤖 Personalize product recommendations just for you</li>
                  <li>📊 Generate intelligent comparison reports</li>
                  <li>📄 Create shareable PDF reports</li>
                  <li>🎯 Understand your real needs (not just specs)</li>
                  <li>💡 Explain why products fit (or don't fit) your profile</li>
                  <li>🌱 Highlight sustainable and local seller options</li>
                </ul>
              </div>
            </div>
          )}

          {saved && <div className="success-message">✓ Profile saved successfully</div>}

          {/* Navigation Buttons */}
          <div className="button-group-nav">
            {step > 1 && (
              <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                ← Previous
              </button>
            )}
            {step < totalSteps ? (
              <button className="btn-primary" onClick={() => setStep(step + 1)}>
                Next →
              </button>
            ) : (
              <>
                <button className="btn-primary" onClick={handleSave}>
                  Save Profile
                </button>
                <button className="btn-secondary" onClick={handleContinue}>
                  Continue to Shopping
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

