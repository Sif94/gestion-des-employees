import express from 'express'
import { isAuth, isAdmin, isRH } from '../middlewares/protectedRoutesMiddleware.js'
import { addConge, deleteCongeById, getAllConges, getCongeById, getCongesByEmployeeId, getCongesRediges, updateCongeById } from '../controllers/congeController.js'



const router = express.Router()

router.get('/', [isAuth, isAdmin, isRH], getAllConges)
router.post('/', [isAuth, isAdmin, isRH], addConge)
router.get('/:id', [isAuth, isAdmin, isRH], getCongeById)
router.put('/update/:id', [isAuth, isAdmin, isRH], updateCongeById)
router.delete('/delete/:id', [isAuth, isAdmin, isRH], deleteCongeById)
router.get('/employee/conges/:id', [isAuth, isAdmin, isRH], getCongesByEmployeeId)
router.get('/conges/rediges/', [isAuth, isAdmin, isRH], getCongesRediges)
export default router