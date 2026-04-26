const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// 🔹 PostgreSQL connection
const pool = new Pool({
    user: "java",
    host: "localhost",
    database: "Users_DB",
    password: "script",
    port: 5433,
});

// 🔹 File upload config
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 🔹 API route
app.post("/api/profile", upload.single("profilePicInput"), async (req, res) => {
    try {
        const { name, email, phone, bio } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const result = await pool.query(
            `INSERT INTO users (name, email, phone, bio, image_path)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, email, phone, bio, imagePath]
        );

        res.json({ success: true, user: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// 🔹 Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});