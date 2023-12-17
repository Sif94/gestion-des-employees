import express from 'express';
import { createHeureSupplementaire, deleteHeureSupplementaireById, getAllHeureSupplementaires, getHeureSupplementaireById, updateHeureSupplementaireById } from '../controllers/heureSuppController.js';
import {isAuth, isAuthorized} from "../middlewares/protectedRoutesMiddleware.js"


const router = express.Router();

router.get('/', [isAuth, isAuthorized("Admin", "RH")], getAllHeureSupplementaires)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getHeureSupplementaireById)
router.post('/', [isAuth, isAuthorized("Admin", "RH")], createHeureSupplementaire)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")], updateHeureSupplementaireById)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteHeureSupplementaireById)

export default router
