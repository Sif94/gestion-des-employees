import express from "express";
import { createAbsence, deleteAbsence, getAbsence, getAllAbsence, getAllAbsencesRediges, updateAbsence } from '../controllers/absenceController.js'
import {isAuth, isAdmin, isRH} from "../middlewares/protectedRoutesMiddleware.js"

const router = express.Router();

router.post("/", [isAuth, isAdmin, isRH], createAbsence);
router.get('/', [isAuth, isAdmin, isRH], getAllAbsence)
router.get('/:id', [isAuth, isAdmin, isRH], getAbsence)
router.put('/:id', [isAuth, isAdmin, isRH], updateAbsence)
router.delete('/:id', [isAuth, isAdmin, isRH], deleteAbsence)
router.get('/absences_rediges/signaleur', [isAuth, isAdmin, isRH], getAllAbsencesRediges)
export default router