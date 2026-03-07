function ComparisonTable({products}){

return(

<div className="glass-card">

<h2>Product Comparison</h2>

<table className="compare-table">

<thead>
<tr>
<th>Feature</th>
{products.map(p=>(<th key={p.id}>{p.name}</th>))}
</tr>
</thead>

<tbody>

<tr>
<td>Price</td>
{products.map(p=>(<td key={p.id}>₹{p.price}</td>))}
</tr>

<tr>
<td>Rating</td>
{products.map(p=>(<td key={p.id}>⭐{p.rating}</td>))}
</tr>

<tr>
<td>Brand</td>
{products.map(p=>(<td key={p.id}>{p.brand}</td>))}
</tr>

</tbody>

</table>

</div>

)

}

export default ComparisonTable