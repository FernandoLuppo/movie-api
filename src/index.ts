//  Dependencies
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import * as dotenv from 'dotenv' 
dotenv.config()
//  Routes
import pages from "./routes/pages"

//  Configurations
//  PORT
const PORT = process.env.PORT
//  Express
const app = express()
app.use(express.json())
//  Mongoose and MongoDB
const MONGODB_URL = process.env.MONGODB_URL
mongoose.set("strictQuery", true)
const connect = async () => {
    if (MONGODB_URL) {
        await mongoose.connect(MONGODB_URL)
        .then(() => console.log("Connected with Successful"))
        .catch(error => console.log("There was an error to try connect with server " + error))
    }
}
connect()
//  Cors
app.use(cors())
//  Routes
app.use("/", pages)

app.listen(PORT, () => console.log("Server running on port " + PORT))
