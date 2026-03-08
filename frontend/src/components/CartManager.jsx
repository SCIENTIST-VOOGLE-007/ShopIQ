import { useState } from "react"

function CartManager(){

const [cart,setCart]=useState([])

const removeItem=(id)=>{

setCart(cart.filter(item=>item.id!==id))

}

return(

<div className="glass-card">

<h2>Your Cart</h2>

{cart.length===0 && (
  <p>No items yet. This cart currently works as a placeholder; integration with e-commerce platforms and persistence will be added soon.</p>
)}

{cart.map(item=>(

<div key={item.id} className="cart-item">

<span>{item.name}</span>

<span>₹{item.price}</span>

<button onClick={()=>removeItem(item.id)}>Remove</button>

</div>

))}

</div>

)

}

export default CartManager