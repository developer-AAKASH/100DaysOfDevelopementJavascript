const express = require("express");
const router = express.Router();

const { 
    isSignedIn, 
    isAuthenticated, 
    isAdmin 
} = require("../controllers/authentication");
const { getUserById, getAllUser } = require("../controllers/user");
const { 
    getProductById, 
    addProduct, 
    getProduct, 
    getPhoto, 
    updateProduct, 
    deleteProduct, 
    getAllProduct,
    getAllUniqueCategories
} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
    "/product/add/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    addProduct
);

router.get(
    "/products",
    getAllProduct
);

router.get(
    "/product/:productId",
    getProduct
);

router.get(
    "/product/photo/:productId",
    getPhoto
);

router.get(
    "/products/categories",
    getAllUniqueCategories
);

router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

module.exports = router;