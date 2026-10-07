const express = require("express");
const router = express.Router();

// 1. Fixed: Import register from the correct file
const { register } = require('../controller/authcontroller'); 
const { createRegistration} = require('../controller/registrationcontroller');
// 2. Fixed: login usually stays in authcontroller
const { login } = require('../controller/authcontroller');
const { createOrder, getMyOrders } = require('../controller/ordercontroller');
const { createProduct } = require('../controller/productcontroller');

const {protect} = require('../middleware/authmiddleware');
const {authorize} = require('../middleware/rolemiddleware');

//public routes
router.post('/register', register);
router.post('/create-registration', createRegistration);
router.post('/login', login);

//order routes (protected)
router.post('/create-order', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
//private/protected routes
router.post('/add-product', protect, authorize('farmer'), createProduct);

module.exports = router;