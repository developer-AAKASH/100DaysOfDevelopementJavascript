const express = require("express");
const router = express.Router();

const { updateStockAndSold } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { getOrderById, addOrder, getAllOrders, updateStatus, getOrderStatus } = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes...
router.post(
    "/order/add/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStockAndSold,
    addOrder
);

router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin, 
    getAllOrders
);

router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);

router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

// exporting routes...
module.exports = router;