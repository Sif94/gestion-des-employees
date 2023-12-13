import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";


const isAuth = asyncHandler( async (req, res, next) => {
        let token;
            try {
                token = req.cookies.token
                if(!token){
                    throw Error('Veuillez vous authentifier: Pas de token')
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.employee = await Employee.findById(decoded._id);
                // console.log(req.employee)
                next()
            } catch (error) {
                res.status(401).json({ message: `Token Invalide: ${error.message}` });
            }
        
})
function isAuthorized(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.employee.type)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }
}
export {
    isAuth,
    isAuthorized
}