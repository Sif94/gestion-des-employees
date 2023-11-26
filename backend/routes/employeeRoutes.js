import express from "express";
import { isAuth, isAdmin } from "../middlewares/protectedRoutesMiddleware.js";
import { addEmployee, authEmployee, deleteEmployee, getEmployeeData, getEmployees, logoutEmployee, updateEmployee } from "../controllers/employeeController.js";
const router = express.Router();

router.post('/register', [isAuth], addEmployee)
router.post('/auth', authEmployee)
router.get('/', [isAuth, isAdmin], getEmployees)
router.post('/logout', isAuth, logoutEmployee)
router.put('/update/:id', [isAuth, isAdmin], updateEmployee)
router.get('/:id', [isAuth, isAdmin], getEmployeeData)
router.delete('/delete/:id', [isAuth, isAdmin], deleteEmployee)

export default router