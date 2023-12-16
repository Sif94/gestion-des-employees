import express from "express";
import { createRetard, getAllRetards, getAllRetardsByEmployeeId, getAllRetardsRediges, getRetardById, updateRetardById, deleteRetardById } from "../controllers/retardController.js";
import {isAuth,  isAuthorized} from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();
router.post("/", [isAuth, isAuthorized("Admin", "RH")], createRetard);
router.get("/", [isAuth, isAuthorized("Admin", "RH")], getAllRetards);
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getRetardById)
router.get('/:id/retards', [isAuth, isAuthorized("Admin", "RH")], getAllRetardsByEmployeeId)
router.get('/retards_rediges/signaleur', [isAuth,isAuthorized("Admin", "RH")], getAllRetardsRediges)
router.put('/:id', [isAuth, isAuthorized("Admin", "RH")], updateRetardById)
router.delete('/:id', [isAuth, isAuthorized("Admin", "RH")], deleteRetardById)
export default router