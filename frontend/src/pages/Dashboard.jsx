import ProfileSummary from "../components/ProfileSummary"
import ReportDownload from "../components/ReportDownnload"

function Dashboard(){

const mockProfile = {
name:"ShopIQ User",
category:"Electronics",
budget:20000,
brand:"Samsung"
}

return(

<div className="page">

<h1>Dashboard</h1>

<div className="dashboard-grid">

<ProfileSummary profile={mockProfile}/>

<ReportDownload/>

</div>

</div>

)

}

export default Dashboard