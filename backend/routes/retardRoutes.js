import express from "express";
import { createRetard, getAllRetards, getAllRetardsByEmployeeId, getAllRetardsRediges, getRetardById, updateRetardById, deleteRetardById } from "../controllers/retardController.js";
import {isAuth, isAdmin} from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();
router.post("/", [isAuth, isAdmin], createRetard);
router.get("/", [isAuth, isAdmin], getAllRetards);
router.get('/:id', [isAuth, isAdmin], getRetardById)
router.get('/:id/retards', [isAuth, isAdmin], getAllRetardsByEmployeeId)
router.get('/retards_rediges/signaleur', [isAuth,isAdmin], getAllRetardsRediges)
router.put('/:id', [isAuth, isAdmin], updateRetardById)
router.delete('/:id', [isAuth, isAdmin], deleteRetardById)
export default router