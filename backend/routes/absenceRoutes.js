import express from "express";
import { createAbsence, deleteAbsence, getAbsence, getAllAbsence, getAllAbsencesRediges, updateAbsence } from '../controllers/absenceController.js'
import {isAuth, isAdmin} from "../middlewares/protectedRoutesMiddleware.js"

const router = express.Router();

router.post("/", [isAuth, isAdmin], createAbsence);
router.get('/', [isAuth, isAdmin], getAllAbsence)
router.get('/:id', [isAuth, isAdmin], getAbsence)
router.put('/:id', [isAuth, isAdmin], updateAbsence)
router.delete('/:id', [isAuth, isAdmin], deleteAbsence)
router.get('/absences_rediges/signaleur', [isAuth, isAdmin], getAllAbsencesRediges)
export default router