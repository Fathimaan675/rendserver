const Seller = require('../models/sellermodel');
const bcrypt = require('bcrypt');

exports.registerSeller = async (req, res) => {
    console.log("Inside registerSeller Request!!!");
    const { firstname, lastname, email, phonenumber, password } = req.body;
    console.log(firstname, lastname, email, phonenumber, password);

    try {
        // Check if the seller already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            console.log("User already exists with email:", email);
            return res.status(406).json({ message: "User already exists!" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new seller instance
        const newSeller = new Seller({
            firstname,
            lastname,
            email,
            phonenumber,
            password: hashedPassword // Store the hashed password
        });

        // Save the new seller to the database
        await newSeller.save();

        // Respond with success status and the new seller's data (excluding the password)
        console.log("Seller registered successfully:", newSeller);
        return res.status(201).json({
            message: "Seller registered successfully",
            seller: {
                id: newSeller._id,
                firstname: newSeller.firstname,
                lastname: newSeller.lastname,
                email: newSeller.email,
                phonenumber: newSeller.phonenumber
            }
        });
    } catch (err) {
        console.error("Error occurred during seller registration:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
