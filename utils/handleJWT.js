const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
/**
 *Debes de pasar el objeto usuario de auth
 * @param {*} user 
 * @returns 
 */
const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "2h" }
    );
    return sign;
}
/**
 *  Debe de pasarse el token de session JWT
 * @param {*} tokenJWT  
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    try {
        return jsonwebtoken.verify(tokenJWT, JWT_SECRET)
    } catch (error) {
        return null;

    }
}

module.exports = { tokenSign, verifyToken };