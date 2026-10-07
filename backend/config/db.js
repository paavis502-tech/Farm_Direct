const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://paavis502_db_user:Rajput@ac-yqqzjjk-shard-00-00.5tgeaxj.mongodb.net:27017,ac-yqqzjjk-shard-00-01.5tgeaxj.mongodb.net:27017,ac-yqqzjjk-shard-00-02.5tgeaxj.mongodb.net:27017/?ssl=true&replicaSet=atlas-w32dke-shard-0&authSource=admin&appName=Cluster7"); //use your mongo uri
        console.log("MongoDB Connected...");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
