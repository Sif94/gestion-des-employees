import express from 'express'
import { addDepartement, getDepartementById, getDepartements } from '../controllers/departementController.js';
import { isAuth, isAdmin } from "../middlewares/protectedRoutesMiddleware.js";

const router = express.Router();


router.post('/', [isAuth, isAdmin], addDepartement)

router.get('/', [isAuth, isAdmin], getDepartements)
router.get('/:id', [isAuth, isAdmin], getDepartementById)

export default router