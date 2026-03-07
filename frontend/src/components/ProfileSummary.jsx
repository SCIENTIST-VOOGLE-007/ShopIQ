function ProfileSummary({profile}){

return(

<div className="glass-card profile-card">

<h2>Your Shopping Profile</h2>

<p><b>Name:</b> {profile.name}</p>
<p><b>Preferred Category:</b> {profile.category}</p>
<p><b>Budget Range:</b> ₹{profile.budget}</p>
<p><b>Favorite Brand:</b> {profile.brand}</p>

</div>

)

}

export default ProfileSummary