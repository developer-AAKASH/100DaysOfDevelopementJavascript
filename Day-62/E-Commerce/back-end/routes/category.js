const express = require("express");
const router = express.Router();

const { 
    getCategoryById, 
    createCategory, 
    getCategory, 
    getAllCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category");

const { 
    isSignedIn, 
    isAuthenticated, 
    isAdmin 
} = require("../controllers/authentication");

const { 
    getUserById 
} = require("../controllers/user");

// params...
router.param("userId", getUserById);
router.param("categoryId", getCategoryById );

// actual routes...

// adding category...
router.post(
    "/category/create/:userId", 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createCategory
);

router.get(
    "/category/:categoryId",
    getCategory
);

router.get(
    "/categories",
    getAllCategory
);

router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJmYzQ5ZTlkZDY1ZjA3ZmQ4OGMyNWEiLCJpYXQiOjE2MTQxNzc2MzB9.TIFZXogsJqxqmNl7dsoFrmc36FeVK1_wsBYW-TKjANU
// 602fc49e9dd65f07fd88c25a