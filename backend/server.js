import express from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departementRoutes from "./routes/departementRoutes.js";
import absenceRoutes from "./routes/absenceRoutes.js"
import retardRoutes from "./routes/retardRoutes.js"
import congeRoutes from "./routes/congeRoutes.js"
import contratRoutes from "./routes/contratRoutes.js"
import projetRoutes from "./routes/projetRoutes.js"
import tacheRoutes from "./routes/tacheRoutes.js"
import heureSuppRoutes from "./routes/heureSuppRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();


connectDB();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/employees', employeeRoutes)
app.use('/api/departements', departementRoutes)
app.use('/api/absences', absenceRoutes)
app.use('/api/retards', retardRoutes)
app.use('/api/conges', congeRoutes)
app.use('/api/contrats', contratRoutes)
app.use('/api/projets', projetRoutes)
app.use('/api/taches', tacheRoutes)
app.use('/api/heuresupps', heureSuppRoutes)
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})  
