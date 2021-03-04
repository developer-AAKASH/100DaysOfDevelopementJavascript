const express = require("express");
const { makePayment } = require("../controllers/stripe");
const router = express.Router();

router.post(
    "/stripe",
    makePayment
);

module.exports = router;