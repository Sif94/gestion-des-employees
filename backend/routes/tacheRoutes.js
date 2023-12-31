import express from "express";
import { createTache, deleteTacheById, getAllTaches, getTacheById, getTachesByEmployeeId, updateTacheById } from "../controllers/tacheController.js";
import {isAuth, isAuthorized} from "../middlewares/protectedRoutesMiddleware.js"


const router = express.Router();

router.get('/', [isAuth, isAuthorized("Admin", "RH")], getAllTaches)
router.post('/', [isAuth, isAuthorized("Admin", "RH")], createTache)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getTacheById)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")], updateTacheById)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteTacheById)
router.get('/employee/:id/taches', [isAuth], getTachesByEmployeeId)

export default router