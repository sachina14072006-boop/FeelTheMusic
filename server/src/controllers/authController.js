const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { email, first_name, last_name, date_of_birth, password } = req.body;

        if (!email || !first_name || !last_name || !date_of_birth || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [existingUsers] = await pool.query(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users (email, first_name, last_name, date_of_birth, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
            [email, first_name, last_name, date_of_birth, password_hash]
        );

        res.status(201).json({
            message: "User registered successfully",
            user_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};