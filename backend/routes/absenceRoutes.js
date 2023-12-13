import express from "express";
import { createAbsence, deleteAbsence, getAbsence, getAllAbsence, getAllAbsencesRediges, updateAbsence } from '../controllers/absenceController.js'
import {isAuth, isAuthorized} from "../middlewares/protectedRoutesMiddleware.js"

const router = express.Router();

router.post("/", [isAuth, isAuthorized("Admin", "RH")], createAbsence);
router.get('/', [isAuth, isAuthorized("Admin", "RH")], getAllAbsence)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getAbsence)
router.put('/:id', [isAuth, isAuthorized("Admin", "RH")], updateAbsence)
router.delete('/:id', [isAuth, isAuthorized("Admin", "RH")], deleteAbsence)
router.get('/absences_rediges/signaleur', [isAuth, isAuthorized("Admin", "RH")], getAllAbsencesRediges)
export default router 