import express from 'express'
import { isAuth, isAdmin } from '../middlewares/protectedRoutesMiddleware.js'
import { addConge, deleteCongeById, getAllConges, getCongeById, getCongesByEmployeeId, getCongesRediges, updateCongeById } from '../controllers/congeController.js'



const router = express.Router()

router.get('/', [isAuth, isAdmin], getAllConges)
router.post('/', [isAuth, isAdmin], addConge)
router.get('/:id', [isAuth, isAdmin], getCongeById)
router.put('/update/:id', [isAuth, isAdmin], updateCongeById)
router.delete('/delete/:id', [isAuth, isAdmin], deleteCongeById)
router.get('/employee/conges/:id', [isAuth, isAdmin], getCongesByEmployeeId)
router.get('/conges/rediges/', [isAuth, isAdmin], getCongesRediges)
export default router