import express from 'express'
import { addDepartement, deleteDepartement, getDepartementById, getDepartements, updateDepartement } from '../controllers/departementController.js';
import { isAuth, isAuthorized } from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();


router.post('/',[isAuth, isAuthorized("Admin")], addDepartement)
router.get('/', [isAuth, isAuthorized("Admin", "Chef_De_Departement", "RH", "Chef_De_Projet")], getDepartements)
router.get('/:id', [isAuth, isAuthorized("Admin", "Chef_De_Departement", "Chef_De_Projet", "RH")], getDepartementById)
router.put('/update/:id', [isAuth, isAuthorized("Admin")], updateDepartement)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin")], deleteDepartement)
export default router