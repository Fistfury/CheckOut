const express = require('express');
const router = express.Router();
const { getProducts, createStripeCheckout } = require('../controllers/stripe.controller');

router.get('/products', getProducts);
router.post('/checkout', createStripeCheckout);

module.exports = router;