const Products = require("../models/product");

const productCtrl = {
  products: async (req, res) => {
    try {
      const product = await Products.find();
      res.send(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  oneProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id)
      res.send(product)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  product: async (req, res) => {
    try {
      req.body.image = req.file.filename;

      const newProduct = new Products(req.body);
      await newProduct.save();

      res.json({ msg: "Product uploaded successfully" });
      // // res.status(201).json(saveProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  delProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);

      if (!product) return res.status(404).json({ msg: "Product not found" });
    //   await Products.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Product deleted successfully" });

      // res.json({ msg: "Product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
