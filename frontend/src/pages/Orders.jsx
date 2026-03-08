import OrderTracker from "../components/OrderTracker"

function Orders(){

// currently a static mock; real tracking from Amazon/Flipkart/etc. will be added later.
const mockOrder = {
status:"shipped"
}

return(

<div className="page">

<h1>Your Orders</h1>
<p>Order history and cross-platform tracking is a planned feature. For now this displays a sample status.</p>
<OrderTracker order={mockOrder}/>

</div>

)

}
export default Orders