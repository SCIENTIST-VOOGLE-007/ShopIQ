import { Link } from "react-router-dom"

function ProfileSummary({ profile }) {
  // some properties live under profile.profile when passed the full user object
  const userInfo = profile.profile || {};

  return (
    <div className="glass-card profile-card">
      <h2>Your Shopping Profile</h2>
      <p><b>Name:</b> {profile.name || "-"}</p>
      <p><b>Age Group:</b> {userInfo.ageGroup || "-"}</p>
      <p><b>Region:</b> {userInfo.region || "-"}</p>
      <p><b>Budget Preference:</b> {userInfo.budgetPreference || "-"}</p>
      {userInfo.budgetRange && userInfo.budgetRange.min && userInfo.budgetRange.max && (
        <p><b>Budget Range:</b> ₹{userInfo.budgetRange.min} - ₹{userInfo.budgetRange.max}</p>
      )}
      <p><b>Interests:</b> {(userInfo.interests || []).join(", ") || "-"}</p>
      <Link to="/profile" className="btn-secondary" style={{ marginTop: "10px" }}>
        Edit Profile
      </Link>
    </div>
  )
}

export default ProfileSummary