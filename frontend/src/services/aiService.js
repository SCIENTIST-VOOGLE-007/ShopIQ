import api from "./api"

export const sendChatMessage = async(message)=>{

try{

const res = await api.post("/ai/chat",{message})

return res.data

}
catch(err){

console.error("AI Chat Error",err)

}

}

export const getRecommendations = async(query)=>{

try{

const res = await api.post("/ai/recommend",{query})

return res.data

}
catch(err){

console.error("Recommendation Error",err)

}

}

export const compareProducts = async(products)=>{

try{

const res = await api.post("/ai/compare",{products})

return res.data

}
catch(err){

console.error("Comparison Error",err)

}

}

export const generateReport = async()=>{

try{

const res = await api.get("/report/download")

return res.data

}
catch(err){

console.error("Report Error",err)

}

}