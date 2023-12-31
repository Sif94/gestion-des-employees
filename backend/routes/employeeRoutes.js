import express from "express";
import upload from "../config/multerConfig.js";
import { isAuth, isAuthorized } from "../middlewares/protectedRoutesMiddleware.js";
import { addEmployee, authEmployee, deleteEmployee, generateEmployeeRefreshToken, getEmployeeData, getEmployees, getEmployeesByDepartement, getProfile, logoutEmployee, updateEmployee } from "../controllers/employeeController.js";
const router = express.Router();

router.post('/register',[isAuth, isAuthorized("Admin", "RH")],upload.single('profileImage'), addEmployee)
router.post('/auth', authEmployee)
router.get('/', [isAuth, isAuthorized("Admin", "RH", "Chef_De_Departement", "Chef_De_Projet")], getEmployees)
router.post('/logout', logoutEmployee)
router.put('/update/:id', [isAuth, isAuthorized("Admin", "RH")],upload.single('profileImage'), updateEmployee)
router.get('/:id', [isAuth], getEmployeeData)
router.delete('/delete/:id', [isAuth, isAuthorized("Admin", "RH")], deleteEmployee)
router.get('/auth/profile', [isAuth], getProfile)
router.get('/employees/refresh/token', generateEmployeeRefreshToken) 
router.get('/departements/:id/employees', [isAuth, isAuthorized("Admin", "RH", "Chef_De_Departement")], getEmployeesByDepartement)
export default router 