import axios from 'axios';
import asyncHandler from "express-async-handler";

const  getEmloyeePerformanceClass = asyncHandler(async (req, res) => {
    try {
        let body = req.body;
        console.log(body)
        const response = await axios.post('http://localhost:3000/classify', body)
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
    
})

export  {
    getEmloyeePerformanceClass
}