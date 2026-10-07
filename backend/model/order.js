const mongoose = require('mongoose')

const order = new mongoose.Schema({
    id:{type: String},
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true}],
    farmer:{type: String},
    consumer:{type: mongoose.Schema.Types.ObjectId, ref:'Users', required: true},
    total:{type: Number, required: true},
    steps:{type: Number},
    status:{type: String, required: true, default: 'pending'}
}, {timestamp: true});

const Orders = mongoose.model("Orders", order);

module.exports = Orders;