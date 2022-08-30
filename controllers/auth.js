const { encrypt, compare } = require('../utils/handlePassword');
const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJWT");
const { userModel } = require("../models");
const { matchedData } = require('express-validator');

/**
 * Controlador encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerControl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password)
        const body = { ...req, password };

        const dataUser = await userModel.create(body);
        dataUser.set("password", undefined, { strict: false });
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_CANT_CREATE_USER")
    }
}





const loginControl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await userModel.findOne({ where: { email: req.email } });
        if (!user) {
            handleHttpError(res, "USER_NO_EXISTS", 404);
            return;
        } 
        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 402);
            return;
        }
        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER")
        console.log(e);
    }
}

module.exports = { registerControl, loginControl }; 