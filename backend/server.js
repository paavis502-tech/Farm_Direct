require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errormiddleware');
const routes = require('./routes/routes');

const app = express();
connectDB();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("FarmDirect Backend is Running 🚀");
});


//routes
app.use('/api', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));