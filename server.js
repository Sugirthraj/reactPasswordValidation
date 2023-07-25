// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = "mongodb://localhost:27017/test";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const passwordSchema = new mongoose.Schema({
  password: String,
  steps: Number,
});

const PasswordModel = mongoose.model("Password", passwordSchema);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/password/check", async (req, res) => {
  const { password } = req.body;
  const steps = calculatePasswordStrength(password);

  try {
    // Store password and steps in MongoDB
    const passwordData = new PasswordModel({ password, steps });
    await passwordData.save();

    res.json({ steps });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port ${3001}`);
});
