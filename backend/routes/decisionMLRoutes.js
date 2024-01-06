import express from "express";
import {isAuth, isAuthorized} from "../middlewares/protectedRoutesMiddleware.js"

import { getEmloyeePerformanceClass } from "../controllers/decisionMLController.js";
const router = express.Router();


router.post('/decision/classify', [isAuth, isAuthorized("Admin", "RH")], getEmloyeePerformanceClass)

export default router 