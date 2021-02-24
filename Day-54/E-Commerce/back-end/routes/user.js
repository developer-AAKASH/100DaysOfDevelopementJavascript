const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUser, userOrdersList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");

router.param("userId", getUserById );

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser );

router.get("/users", getAllUser );

router.put("/user/:userId", isSignedIn, isAuthenticated, );

router.get("/user/orders/:userId", userOrdersList );

module.exports = router;