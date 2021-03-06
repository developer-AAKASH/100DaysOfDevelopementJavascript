const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { signout, signup } = require("../controllers/authentication");

router.get("/signout", signout );

router.post("/signup", [
    check("userName").isLength({ min: 3 }).withMessage("username lenth should be atleast 3..."),
    check("email").isEmail().withMessage("email is not valid..."),
    check("password").isLength({ min: 3 }).withMessage("password lenth should be more than 3...")
], signup );

module.exports = router;