import express from "express";
import { createRetard, getAllRetards, getAllRetardsByEmployeeId, getAllRetardsRediges, getRetardById, updateRetardById, deleteRetardById } from "../controllers/retardController.js";
import {isAuth, isAdmin, isRH} from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();
router.post("/", [isAuth, isAdmin, isRH], createRetard);
router.get("/", [isAuth, isAdmin, isRH], getAllRetards);
router.get('/:id', [isAuth, isAdmin, isRH], getRetardById)
router.get('/:id/retards', [isAuth, isAdmin, isRH], getAllRetardsByEmployeeId)
router.get('/retards_rediges/signaleur', [isAuth,isAdmin], getAllRetardsRediges)
router.put('/:id', [isAuth, isAdmin, isRH], updateRetardById)
router.delete('/:id', [isAuth, isAdmin, isRH], deleteRetardById)
export default router