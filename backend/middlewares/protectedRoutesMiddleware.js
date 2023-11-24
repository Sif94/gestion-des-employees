import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";


const isAuth = asyncHandler( async (req, res, next) => {
        let token;
        token = req.cookies.token;
        if (token) {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.employee = await Employee.findById(decode.id).select('-password');
                next()
            } catch (error) {
                res.send(401)
                throw new Error('Non autorisé: token invalide')
            }
        } else {
            res.send(401)
            throw new Error('Non autorisé: pas de token')
        }
})
const isAdmin = asyncHandler( async(req,res,next) => {
    if(req.employee.type === 'Admin'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
export {
    isAuth,
    isAdmin
}