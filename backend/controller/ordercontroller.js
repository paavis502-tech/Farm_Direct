const Order = require("../model/order");
const Product = require("../model/product");

const createOrder = async (req, res) => {
    try{
        const {items} = req.body;

        if(!items || items.length === 0) {
            return res.status(400).json({message: "no item in order"});
        }

        // 1. Fetch the actual products from the DB to get their prices
        const productDetails = await Product.find({ _id: { $in: items } });

        // 2. Calculate the total (Server-side calculation is safer than trusting the frontend)
        const total = productDetails.reduce((sum, product) => sum + product.price, 0);

        const newOrder = new Order({
            items: items, consumer: req.user.id, total: total, status: 'pending'
        });

        const saveOrder = await newOrder.save();
        res.status(201).json({
            success: true,
            message: "order placed successfully!🌾",
            order: saveOrder
        });
    } catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
    
};
const getMyOrders = async(req, res) => {
    try {
        const orders = await Order.find({ consumer: req.user.id })
         .populate('items')
         .sort({createdAt: -1});

         res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createOrder, getMyOrders};