const express = require("express");
const router = express.Router();

const { validatorRegister, validatorLogin } = require("../validators/auth");
const {registerControl, loginControl} = require("../controllers/auth");

//TODO: localhost:3001/api/auth/login
//TODO: localhost:3001/api/auth/register

router.post("/register",validatorRegister, registerControl );
router.post("/login",validatorLogin, loginControl );

module.exports = router;  