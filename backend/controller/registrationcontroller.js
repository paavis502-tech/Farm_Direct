const Registration = require("../model/register");

const createRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role } = req.body;

    if (!firstName || !email || !phone ||!role) {
      return res.status(400).json({
        success: false,
        message: "Kuch fields khaali hain. Sab bharo."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email sahi nahi hai."
      });
    }

    const newRegistration = new Registration({
      firstName, lastName, email, phone, role
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Registration ho gaya! 🎉"
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Yeh email pehle se registered hai."
      });
    }

    console.log("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server mein kuch problem hai. Baad mein try karo."
    });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const all = await Registration.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: all.length,
      data: all
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error aaya." });
  }
};

module.exports = { createRegistration, getAllRegistrations };