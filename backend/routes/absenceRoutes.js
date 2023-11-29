import express from "express";
import { createAbsence, deleteAbsence, getAbsence, updateAbsence } from '../controllers/absenceController.js'
import {isAuth, isAdmin} from "../middlewares/protectedRoutesMiddleware.js"

const router = express.Router();

router.post("/", [isAuth, isAdmin], createAbsence);
router.get('/:id', [isAuth, isAdmin], getAbsence)
router.put('/:id', [isAuth, isAdmin], updateAbsence)
router.delete('/:id', [isAuth, isAdmin], deleteAbsence)
export default router