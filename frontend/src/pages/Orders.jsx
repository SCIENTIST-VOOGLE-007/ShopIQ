import OrderTracker from "../components/OrderTracker"

function Orders(){

const mockOrder = {
status:"shipped"
}

return(

<div className="page">

<h1>Your Orders</h1>

<OrderTracker order={mockOrder}/>

</div>

)

}

export default Orders