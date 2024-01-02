import express from "express";
import {isAuth, isAuthorized} from '../middlewares/protectedRoutesMiddleware.js'
import { addContrat, deleteContratById, getAllContrats, getContratByID, getEmployeeContrats, getEmployeeContratsRediges, printContrat, updateContratById } from "../controllers/contratController.js";


const router = express.Router();

router.get('/', [isAuth, isAuthorized("Admin", "RH")], getAllContrats)
router.post('/', [isAuth, isAuthorized("Admin", "RH")], addContrat)
router.get('/print/contrats/:id', [isAuth, isAuthorized("Admin", "RH")], printContrat)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getContratByID)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")], updateContratById)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteContratById)
router.get('/employee/:id/contrats', [isAuth], getEmployeeContrats)
router.get('/employee/contrats/rediges', [isAuth, isAuthorized("Admin", "RH")], getEmployeeContratsRediges)
export default router