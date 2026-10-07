const User = require("../model/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const {username, email, password, role} = req.body;
    if (!username || !email || !password || !role){
        return res.status(400).json({
            status: "Failed",
            message: "All the fields are required."
        })
    }
    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({
            status: "Failed",
            message: "Email already registred."
        })
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
        username, email, password:hashedPassword, role
    })

    await newUser.save();

    

    res.status(201).json({
        status: "Success",
        message: "User registered successfully."
    })

}

const login = async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            message: "Email is not registered"
        })
    }

    
    const is_matched = await bcrypt.compare(password, user.password);
    if (!is_matched){
        return res.status(400).json({
            message: "Password is invalid"
        })
    }

    
    const token = jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1D"}
    )

    res.status(200).json({
        message: "Login successful",
        token,
        user: {username: user.username, email: user.email}
    })
}


module.exports = { register, login };