function OrderTracker({order}){

return(

<div className="glass-card">

<h2>Order Tracking</h2>

<ul className="timeline">

<li className={order.status==="placed"?"active":""}>
Order Placed
</li>

<li className={order.status==="shipped"?"active":""}>
Shipped
</li>

<li className={order.status==="out"?"active":""}>
Out for Delivery
</li>

<li className={order.status==="delivered"?"active":""}>
Delivered
</li>

</ul>

</div>

)

}

export default OrderTracker