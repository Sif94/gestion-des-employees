import jwt from "jsonwebtoken"

const generateToken = (res, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV !== 'development', maxAge: 60 * 60 * 1000})
}


export default generateToken