const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require("../utils/handleJWT");
const { userModel } = require("../models");

const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN_LOG_IN_APP", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD", 401);
            return;
        }
        const query={where:{
            [propertiesKey.id]:dataToken[propertiesKey.id]}
        }
        
        const user = await userModel.findOne(query);
        req.user = user;
        next();
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;