const express = require("express");
const client = require("./db.js");
const cors = require("cors");
const { generateUniqueSlug, ExampleMarkdown } = require("./lib.js");

const app = express();
const port = 4000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("You win!");
});

app.get("/table", async (req, res) => {
    try {
        await client.query(
            "CREATE TABLE IF NOT EXISTS blogs.blog(id SERIAL PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, content TEXT, slug VARCHAR(255), title TEXT);"
        );
        console.log("Table Created Successfully");
        res.send("Table created");
    } catch (err) {
        console.error(err);
        res.send("Table failed:", err.message);
    }
});

app.get("/createblog", async (req, res) => {
    const mySlug = generateUniqueSlug(
        "How to make cookies (in only 5 minutes)"
    );
    try {
        await client.query({
            text: "INSERT INTO blogs.blog(content, slug) VALUES($1, $2) RETURNING *",
            values: [ExampleMarkdown, mySlug],
        });
        res.send("Content Done");
    } catch (err) {
        res.send(err.message);
    }
});

app.get("/blog/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
        const result = await client.query({
            text: "SELECT content FROM blogs.blog WHERE slug=$1",
            values: [slug],
        });
        res.json(result.rows[0].content);
    } catch (err) {
        res.json({ error: err });
    }
});

app.listen(port, () => {
    console.log("Server running at http://localhost:", port);
});
