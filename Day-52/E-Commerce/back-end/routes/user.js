const { request } = require("express");

const express = require("express");
const router = exports.Router();

const { getUserById, getUser, getAllUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");

router.param("userId", getUserById );

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser );

// router.get("/users", getAllUser );

router.put("/user/:userId", isSignedIn, isAuthenticated, );

module.exports = router;