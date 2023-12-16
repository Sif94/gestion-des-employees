import express from "express";
import { isAuth, isAuthorized } from "../middlewares/protectedRoutesMiddleware.js";
import { addEmployee, authEmployee, deleteEmployee, generateEmployeeRefreshToken, getEmployeeData, getEmployees, getEmployeesByDepartement, getProfile, logoutEmployee, updateEmployee } from "../controllers/employeeController.js";
const router = express.Router();

router.post('/register', [isAuth, isAuthorized("Admin", "RH")], addEmployee)
router.post('/auth', authEmployee)
router.get('/', [isAuth, isAuthorized("Admin", "RH")], getEmployees)
router.post('/logout', logoutEmployee)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")], updateEmployee)
router.get('/:id', [isAuth, isAuthorized("Admin", "RH")], getEmployeeData)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteEmployee)
router.get('/auth/profile', [isAuth,isAuthorized("Admin", "RH")], getProfile)
router.get('/employees/refresh/token', generateEmployeeRefreshToken) 
router.get('/departements/:id/employees', [isAuth, isAuthorized("Admin", "RH", "Chef_De_Departement")], getEmployeesByDepartement)
export default router