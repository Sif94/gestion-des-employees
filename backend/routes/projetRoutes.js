import { addProjet, deleteProjetById, getAllProjets, getProjectByEmployeeId, getProjetById, updateProjetById } from "../controllers/projetController.js";
import express from "express";
import { isAuth, isAuthorized } from "../middlewares/protectedRoutesMiddleware.js";



const router = express.Router();


router.get('/', [isAuth, isAuthorized("Admin", "Chef_De_Projet", "Chef_De_Departement")], getAllProjets)
router.post('/', [isAuth, isAuthorized("Admin", "Chef_De_Departement")], addProjet)
router.get('/:id',[ isAuth,isAuthorized("Admin", "Chef_De_Projet", "Chef_De_Departement")], getProjetById)
router.put('/update/:id', [isAuth,isAuthorized("Admin", "Chef_De_Departement")], updateProjetById)
router.delete('/delete/:id', [isAuth,isAuthorized("Admin","Chef_De_Departement")], deleteProjetById)
router.get('/employee/:id/projets', [isAuth, isAuthorized("Admin", "Chef_De_Projet", "Chef_De_Departement")], getProjectByEmployeeId)
export default router 