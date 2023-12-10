import express from "express";
import {isAuth, isAdmin, isRH} from '../middlewares/protectedRoutesMiddleware.js'
import { addContrat, deleteContratById, getAllContrats, getContratByID, getEmployeeContrats, getEmployeeContratsRediges, updateContratById } from "../controllers/contratController.js";


const router = express.Router();

router.get('/', [isAuth, isAdmin, isRH], getAllContrats)
router.post('/', [isAuth, isAdmin, isRH], addContrat)
router.get('/:id', [isAuth, isAdmin, isRH], getContratByID)
router.put('/update/:id', [isAuth, isAdmin, isRH], updateContratById)
router.delete('/delete/:id', [isAuth, isAdmin, isRH], deleteContratById)
router.get('/employee/:id/contrats', [isAuth, isAdmin, isRH], getEmployeeContrats)
router.get('/employee/contrats/rediges', [isAuth, isAdmin, isRH], getEmployeeContratsRediges)
export default router