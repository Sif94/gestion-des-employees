import jwt from "jsonwebtoken"
/**
 * Generates a token and sets it as a cookie in the response object.
 *
 * @param {object} res - The response object.
 * @param {string} _id - The user ID.
 */

const generateToken = (res, _id) => {
    // Generate the token
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
    // Set the token as a cookie in the response
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 2 * 60 * 60 * 1000,
    });
  };/**
   * Generates a refresh token and sets it as a cookie in the response object.
   *
   * @param {object} res - The response object.
   * @param {string} _id - The user ID.
   */
  const generateRefreshToken = (res, _id) => {
    // Generate the refresh token
    const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
    // Set the refresh token as a cookie in the response
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  };









export { generateToken, generateRefreshToken} 