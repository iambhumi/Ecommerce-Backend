const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

router.get('/test', (req, res) => {
    res.send('API is working!');
  });
//Product Routes
router.route("/products").get(Controller.getAllProducts);
router.route("/productsID").get(Controller.getProductByID);
router.route("/cart").get(Controller.getCart);
router.route("/cart").post(Controller.addToCart);
router.route("/cart/:ID").delete(Controller.removeFromCart);

//User Routes
router.route("/register").post(Controller.RegisterUser);
router.route("/login").post(Controller.loginUser);
router.route("/Logout").get(Controller.logoutUser);

module.exports = router;

