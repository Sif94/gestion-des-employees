import express from "express";
import { isAuth, isAdmin } from "../middlewares/protectedRoutesMiddleware.js";
import { addEmployee, authEmployee, getEmployees, logoutEmployee } from "../controllers/employeeController.js";
const router = express.Router();

router.post('/register', [isAuth], addEmployee)
router.post('/auth', authEmployee)
router.get('/', [isAuth, isAdmin], getEmployees)
router.post('/logout', isAuth, logoutEmployee)


export default router