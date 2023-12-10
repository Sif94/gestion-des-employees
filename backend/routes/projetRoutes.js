import { addProjet, deleteProjetById, getAllProjets, getProjetById, updateProjetById } from "../controllers/projetController.js";
import express from "express";
import { isAuth, isAdmin, isChefDeProjet, isChefDeDepartement } from "../middlewares/protectedRoutesMiddleware.js";



const router = express.Router();


router.get('/', [isAuth, isAdmin || isChefDeProjet || isChefDeDepartement], getAllProjets)
router.post('/', [isAuth, isAdmin || isChefDeDepartement], addProjet)
router.get('/:id',[ isAuth, isAdmin || isChefDeProjet], getProjetById)
router.put('/update/:id', [isAuth, isAdmin || isChefDeProjet], updateProjetById)
router.delete('/delete/:id', [isAuth, isAdmin || isChefDeProjet], deleteProjetById)
export default router 