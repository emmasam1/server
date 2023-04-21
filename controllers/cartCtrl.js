const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");

const cartCtrl = {
  createCart: async (req, res) => {
    try {
      let { user_id, product_id } = req.body;
      let cart = await Cart.findOne({ user_id, is_checked_out: false });
      let user = await User.findById(user_id);
      let product = await Product.findById(product_id);

      req.body.products = [];

      if (!user) return res.json({ msg: "Invalid user id was passed" });
      if (!product) return res.json({ msg: "Invalid product id was passed" });

      if (cart) {
        let product = cart.products.find((x) => x.product_id === product_id);
        let total_price = 0;

        if (product) {
          product.quantity += req.body.quantity;
          if (product.quantity == 0) {
            cart.products = [];
          }

          cart.products.map((x) => {
            total_price += x.quantity * x.price;
          });
          cart.total_price = total_price.toFixed(2);
          cart.items = cart.products.length;
        } else {
          cart.products.push({
            product_id: req.body.product_id,
            price: req.body.price,
            image: req.body.image,
            quantity: req.body.quantity,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
          });

          cart.products.map((x) => {
            total_price += x.quantity * x.price;
          });

          cart.total_price = total_price.toFixed(2);
          cart.items = cart.products.length;
        }
      } else {
        req.body.products.push({
          product_id: req.body.product_id,
          price: req.body.price,
          image: req.body.image,
          quantity: req.body.quantity,
          description: req.body.description,
          shortDescription: req.body.shortDescription,
        });
        req.body.total_price = req.body.price * req.body.quantity;
        req.body.items = req.body.products.length;

        cart = new Cart(req.body);
      }

      await cart.save();
      res.json({
        msg: "Cart created",
        type: "SUCCESS",
        data: cart,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCartItem: async (req, res) => {
    try {
      const cart = await Cart.find()
      res.send(cart)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = cartCtrl;
