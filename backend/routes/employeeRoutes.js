import express from "express";
import { isAuth, isAdmin } from "../middlewares/protectedRoutesMiddleware.js";
import { addEmployee, authEmployee, deleteEmployee, generateEmployeeRefreshToken, getEmployeeData, getEmployees, getProfile, logoutEmployee, updateEmployee } from "../controllers/employeeController.js";
const router = express.Router();

router.post('/register', [isAuth, isAdmin], addEmployee)
router.post('/auth', authEmployee)
router.get('/', [isAuth, isAdmin], getEmployees)
router.post('/logout', logoutEmployee)
router.put('/update/:id', [isAuth, isAdmin], updateEmployee)
router.get('/:id', [isAuth, isAdmin], getEmployeeData)
router.delete('/delete/:id', [isAuth, isAdmin], deleteEmployee)
router.get('/auth/profile', [isAuth,isAdmin], getProfile)
router.get('/employees/refresh/token', generateEmployeeRefreshToken) 
export default router