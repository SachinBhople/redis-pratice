const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const app = express()
const mongoose = require("mongoose")
const { redis } = require("./utils/redis")
redis.on('connect', () => {
    console.log("Connected to Redis!");
})
mongoose.connect(process.env.MONGO_URL)
app.use(express.json())// body parser
app.use(cors())// frontend ok hone ke baad cors ko call karna he
// risky he 
app.use("/api/v1/articles", require("./routes/blogRoutes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resoures not found" })
})
mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, console.log("Server Running"))
})