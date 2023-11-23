import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/db.js";
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();


connectDB();


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res) => {
    res.status(200).json({
        message: "Hi from server"
    })    
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
