const Product = require("../model/product");

const createProduct = async(req, res) => {
    try {
        const {name, farm, location, price, unit, emoji, tag, category} = req.body;

        if(!name || !price || !unit || !category) {
            return res.status(400).json({message: "please provide all required fields."});

        }
        const newProduct = new Product({
            name, farm, location, price, unit, emoji, tag, category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully!",
            product: savedProduct
        });
    }catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
    
};

module.exports = {createProduct, getAllProducts};