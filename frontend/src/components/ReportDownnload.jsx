function ReportDownload(){

const downloadReport=()=>{

window.open("/api/report/download")

}

return(

<div className="glass-card">

<h2>Shopping Insights Report</h2>

<p>
Download AI generated insights about your
shopping preferences and product recommendations.
</p>

<button className="btn-primary" onClick={downloadReport}>

Download PDF

</button>

</div>

)

}

export default ReportDownload