import ChatBox from "../components/ChatBox"
import VoiceInput from "../components/VoiceInput"
import ComparisonTable from "../components/ComparisonTable"
import ProductCard from "../components/ProductCard"
import { useState } from "react"

function Assistant(){

const [products,setProducts] = useState([])

const handleVoice = (text)=>{
console.log("Voice Input:",text)
}

return(

<div className="page">

<h1>AI Shopping Assistant</h1>

<VoiceInput onResult={handleVoice}/>

<ChatBox/>

{products.length>0 && (
<>
<h2>Recommended Products</h2>

<div className="product-grid">

{products.map(p=>(
<ProductCard key={p.id} product={p}/>
))}

</div>

<ComparisonTable products={products.slice(0,3)}/>

</>
)}

</div>

)

}

export default Assistant