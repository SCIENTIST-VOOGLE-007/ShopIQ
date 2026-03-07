import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"

/*
--------------------------------------------------
IMPORT ROUTES
--------------------------------------------------
*/

import aiRoutes from "./routes/aiRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"



/*
--------------------------------------------------
CONFIGURATION
--------------------------------------------------
*/

dotenv.config()

const app = express()



/*
--------------------------------------------------
CONNECT DATABASE
--------------------------------------------------
*/

connectDB()



/*
--------------------------------------------------
MIDDLEWARE
--------------------------------------------------
*/

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))



/*
--------------------------------------------------
API ROUTES
--------------------------------------------------
*/

app.use("/api/ai", aiRoutes)

app.use("/api/products", productRoutes)

app.use("/api/users", userRoutes)

app.use("/api/cart", cartRoutes)

app.use("/api/orders", orderRoutes)

app.use("/api/report", reportRoutes)



/*
--------------------------------------------------
TEST ROUTE
--------------------------------------------------
*/

app.get("/", (req, res) => {

  res.send("ShopIQ Backend Running 🚀")

})



/*
--------------------------------------------------
SERVER START
--------------------------------------------------
*/

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

})