const express = require('express');
const router = express.Router();
const { getProducts, createStripeCheckout, verifySession } = require('../controllers/stripe.controller');

router.get('/products', getProducts);
router.post('/checkout', createStripeCheckout);
router.post('/verify', verifySession)

module.exports = router;