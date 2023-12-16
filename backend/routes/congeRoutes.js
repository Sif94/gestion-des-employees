import express from 'express'
import { isAuth, isAuthorized} from '../middlewares/protectedRoutesMiddleware.js'
import { addConge, deleteCongeById, getAllConges, getCongeById, getCongesByEmployeeId, getCongesRediges, updateCongeById } from '../controllers/congeController.js'



const router = express.Router()

router.get('/', [isAuth, isAuthorized("Admin", "RH")], getAllConges)
router.post('/', [isAuth, isAuthorized("Admin", "RH")], addConge)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getCongeById)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")], updateCongeById)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteCongeById)
router.get('/employee/conges/:id', [isAuth, isAuthorized("Admin", "RH")], getCongesByEmployeeId)
router.get('/conges/rediges/', [isAuth, isAuthorized("Admin", "RH")], getCongesRediges)
export default router