const { request, response } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/authentication");

router.get("/signout", signout );

router.post("/signup", [
    check("userName").isLength({ min: 3 }).withMessage("username lenth should be atleast 3..."),
    check("email").isEmail().withMessage("email is not valid..."),
    check("password").isLength({ min: 3 }).withMessage("password lenth should be more than 3...")
], signup );

router.post("/signin", [
    check("email").isEmail().withMessage("email is not valid..."),
    //come here for password...
    check("password").isLength({ min: 3 }).withMessage("password lenth should be more than 3...")
], signin );

// router.get("/test", isSignedIn, ( request, response )=>{
//     response.json(request.auth);
// });

module.exports = router;