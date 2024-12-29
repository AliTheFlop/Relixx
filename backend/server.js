const express = require("express");
const client = require("./db.js");
const cors = require("cors");
const generateUniqueSlug = require("./lib.js");
const he = require("he");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:4000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

app.post("/createblog", async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({ content: req.body });
    }
    const title = req.body.title;
    const rawContent = req.body.content;

    const decodedContent = he.decode(rawContent);
    const content = DOMPurify.sanitize(decodedContent);

    const mySlug = generateUniqueSlug(title);
    try {
        await client.query({
            text: "INSERT INTO blogs.blog(content, slug, title) VALUES($1, $2, $3) RETURNING *",
            values: [content, mySlug, title],
        });
        res.send("Content Done");
    } catch (err) {
        res.send(err.message);
    }
});

app.post("/register", async (req, res) => {
    const { user: username, email, pass } = req.body.formData;

    if (username && email && pass) {
        const hashedPwd = await bcrypt.hash(pass, 10);

        try {
            await client.query({
                text: "INSERT INTO users(email, password_hash, username) VALUES ($1, $2, $3)",
                values: [email, hashedPwd, username],
            });

            res.status(200).json({
                message: `User registered successfully`,
            });
        } catch (err) {
            if (err.code === "23505") {
                if (err.constraint === "unique_email") {
                    return res.status(409).json({
                        error: true,
                        message: "Email already exists!",
                    });
                } else if (err.constraint === "unique_username") {
                    return res.status(409).json({
                        error: true,
                        message: "Username is taken :(",
                    });
                }
            }
        }
    } else {
        console.log(req.body.formData);
        res.status(409).json({
            error: true,
            message: "Somethings not right",
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, pass } = req.body.formData;

    if (email && pass) {
        try {
            const result = await client.query({
                text: "SELECT * FROM users WHERE email = $1",
                values: [email],
            });

            if (result.rowCount === 0) {
                return res.status(401).json({
                    error: true,
                    message: "Email not found!",
                });
            }

            const userInfo = result.rows[0];

            const passwordMatch = await bcrypt.compare(
                pass,
                userInfo.password_hash
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    error: true,
                    message: "Authentication failed, Please try again.",
                });
            } else {
                const token = jwt.sign(
                    { userId: userInfo.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 3600000, // 1 hour
                });

                res.status(200).json({ token });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: true, message: err });
        }
    } else {
        console.log(req.body.formData);
        res.status(409).json({
            error: true,
            message: "Somethings not right",
        });
    }
});

app.get("/getblogs", async (req, res) => {
    try {
        const result = await client.query(
            "SELECT * FROM blogs.blog ORDER BY id DESC"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/userinfo", async (req, res) => {
    try {
        const result = await client.query({
            text: "SELECT * FROM users WHERE email = $1",
            values: [email],
        });

        console.log(result);
    } catch (err) {
        console.log(err);
    }
});

app.post("/logout", (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Logout Failed. Something went wrong",
        });
    }
});

app.get("/auth/status", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.listen(port, () => {
    console.log("Server running at http://localhost:", port);
});
