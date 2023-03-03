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
//  Mongoose
mongoose.connect("mongodb://localhost/Movies")
.then(() => console.log("Connected with Successful"))
.catch(error => console.log("There was an error to try connect with server " + error))
//  Cors
app.use(cors())
//  Routes
app.use("/", pages)

app.listen(PORT, () => console.log("Server running on port " + PORT))
