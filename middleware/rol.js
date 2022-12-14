const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        //console.log({user});
        const rolesByUser = user.role;

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));//TRUE O FALSO
        if (!checkValueRol) {
            handleHttpError(res, "ERROR_USER_NOT_PERMISSIONS", 403);
            return
        }
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISION", 403);
    }
}
module.exports = checkRol;