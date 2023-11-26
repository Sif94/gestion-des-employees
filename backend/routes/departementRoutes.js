import express from 'express'
import { addDepartement, deleteDepartement, getDepartementById, getDepartements, updateDepartement } from '../controllers/departementController.js';
import { isAuth, isAdmin } from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();


router.post('/', [isAuth, isAdmin], addDepartement)
router.get('/', [isAuth, isAdmin], getDepartements)
router.get('/:id', [isAuth, isAdmin], getDepartementById)
router.put('/update/:id', [isAuth, isAdmin], updateDepartement)
router.delete('/delete/:id', [isAuth, isAdmin], deleteDepartement)
export default router