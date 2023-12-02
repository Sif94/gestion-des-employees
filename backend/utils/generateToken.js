import jwt from "jsonwebtoken"

const generateToken = (res,_id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET,{expiresIn: '2d'})
     res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV !== 'development', maxAge: 2 * 24 * 60 * 60 * 1000})
}

const generateRefreshToken = (res,_id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET_REFRESH,{expiresIn: '30d'})
     res.cookie('refreshToken', token, {httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV !== 'development', maxAge: 30 * 24 * 60 * 60 * 1000})
}
export { generateToken, generateRefreshToken}