const mongoose = require('mongoose');

const product = new mongoose.Schema({
     name: {type:String, required : true},
    farm: {type:String, required : true},
    location:{type:String, required : true},
    price:{type:Number, required : true},
    unit: {type:Number, required : true},
    emoji: {type: String},
    tag:{type: String, required: true},
    category:{type: String, enum:['Vegetables','Fruits','Dairy','Grains','Herbs','Preserved']}

});

const Products = mongoose.model("Products", product);
module.exports = Products;
