import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departementRoutes from "./routes/departementRoutes.js";
import absenceRoutes from "./routes/absenceRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();


connectDB();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/employees', employeeRoutes)
app.use('/api/departements', departementRoutes)
app.use('/api/absences', absenceRoutes)


app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
