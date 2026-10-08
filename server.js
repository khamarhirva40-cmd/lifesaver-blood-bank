const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// ==================== DONOR SCHEMA ====================

const donorSchema = new mongoose.Schema({

    name: String,
    age: Number,
    gender: String,
    bloodGroup: String,
    phone: String,
    city: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Donor = mongoose.model("Donor", donorSchema);


// ==================== BLOOD REQUEST SCHEMA ====================

const requestSchema = new mongoose.Schema({

    name: String,
    bloodGroup: String,
    units: Number,
    phone: String,
    hospital: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const BloodRequest = mongoose.model("BloodRequest", requestSchema);
const messageSchema = new mongoose.Schema({

    name: String,

    email: String,

    message: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const ContactMessage = mongoose.model("ContactMessage", messageSchema);


// ==================== TEST API ====================

app.get("/", (req, res) => {

    res.send("LifeSaver Blood Bank Backend is Running!");

});

app.get("/api/test", (req, res) => {

    res.json({
        message: "LifeSaver Blood Bank API is working!"
    });

});


// ==================== DONOR API ====================

app.post("/api/donors", async (req, res) => {

    try {

        const donor = new Donor(req.body);

        await donor.save();

        console.log("New Donor Saved:", donor);

        res.json({
            message: "Donor registered successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error saving donor information."
        });

    }

});
app.post("/api/messages", async (req, res) => {

    try {

        const message = new ContactMessage(req.body);

        await message.save();

        console.log("New Contact Message Saved:", message);

        res.json({
            message: "Your message has been sent successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error saving contact message."
        });

    }

});


// ==================== BLOOD REQUEST API ====================

app.post("/api/requests", async (req, res) => {

    try {

        const request = new BloodRequest(req.body);

        await request.save();

        console.log("New Blood Request Saved:", request);

        res.json({
            message: "Blood request submitted successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error saving blood request."
        });

    }

});


// ==================== START SERVER ====================

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Server running at http://localhost:${PORT}`);

});
