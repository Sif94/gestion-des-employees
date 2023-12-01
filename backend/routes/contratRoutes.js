import express from "express";
import {isAuth, isAdmin} from '../middlewares/protectedRoutesMiddleware.js'
import { addContrat, deleteContratById, getAllContrats, getContratByID, getEmployeeContrats, getEmployeeContratsRediges, updateContratById } from "../controllers/contratController.js";


const router = express.Router();

router.get('/', [isAuth, isAdmin], getAllContrats)
router.post('/', [isAuth, isAdmin], addContrat)
router.get('/:id', [isAuth, isAdmin], getContratByID)
router.put('/update/:id', [isAuth, isAdmin], updateContratById)
router.delete('/delete/:id', [isAuth, isAdmin], deleteContratById)
router.get('/employee/:id/contrats', [isAuth, isAdmin], getEmployeeContrats)
router.get('/employee/contrats/rediges', [isAuth, isAdmin], getEmployeeContratsRediges)
export default router