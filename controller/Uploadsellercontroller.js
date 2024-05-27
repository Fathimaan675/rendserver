const UploadSellers = require('../models/uploadseller');

exports.upload = async (req, res) => {
    console.log("Inside uploadSeller Request!!!");
    const { place, imageurl, area, bedrooms, bathrooms, hospitals } = req.body;
    console.log(place, imageurl, area, bedrooms, bathrooms, hospitals);

    try {
        // Check if the required fields are present and have valid values
        if (!place || !imageurl || !area || !bedrooms || !bathrooms || !hospitals) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create a new seller instance
        const newSeller = new UploadSellers({
            place,
            imageurl,
            area,
            bedrooms: parseInt(bedrooms), // Convert bedrooms to integer
            bathrooms: parseInt(bathrooms), // Convert bathrooms to integer
            hospitals
        });

        // Save the new seller to the database
        await newSeller.save();

        // Respond with success status and the new seller's data
        console.log("Seller uploaded successfully:", newSeller);
        return res.status(201).json({
            message: "Seller uploaded successfully",
            seller: newSeller
        });
    } catch (err) {
        console.error("Error occurred during seller upload:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
   
};
exports.getAllProperties = async (req,res)=>{
    try{
        const allProperties = await UploadSellers.find()
        res.status(200).json(allProperties)
    }catch(err){
        res.status(401).json(err)
    }
}