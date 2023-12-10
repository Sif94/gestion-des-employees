import express from 'express'
import { addDepartement, deleteDepartement, getDepartementById, getDepartements, updateDepartement } from '../controllers/departementController.js';
import { isAuth, isAdmin, isChefDeProjet, isChefDeDepartement, isRH } from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();


router.post('/',[isAuth, isAdmin || isChefDeProjet || isChefDeDepartement], addDepartement)
router.get('/', [isAuth, isAdmin || isChefDeProjet || isChefDeDepartement, isRH], getDepartements)
router.get('/:id', [isAuth, isAdmin || isChefDeProjet || isChefDeDepartement, isRH], getDepartementById)
router.put('/update/:id', [isAuth, isAdmin], updateDepartement)
router.delete('/delete/:id', [isAuth, isAdmin], deleteDepartement)
export default router