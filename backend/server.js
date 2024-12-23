const express = require("express");
const client = require("./db.js");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

const ExampleMarkdown =
    "#Hello\nHow are we today?\n\n##What we're doing about it.";

app.get("/", (req, res) => {
    res.send("You win!");
});

app.get("/table", async (req, res) => {
    try {
        await client.query(
            "CREATE TABLE IF NOT EXISTS blogs.blog(id SERIAL PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, content TEXT);"
        );
        console.log("Table Created Successfully");
        res.send("Table created");
    } catch (err) {
        console.error(err);
        res.send("Table failed:", err.message);
    }
});

app.get("/createblog", async (req, res) => {
    try {
        await client.query({
            text: "INSERT INTO blogs.blog(content) VALUES($1) RETURNING *",
            values: [ExampleMarkdown],
        });
        res.send("Content Done");
    } catch (err) {
        res.send(err.message);
    }
});

app.get("/markdown", async (req, res) => {
    try {
        const result = await client.query(
            "SELECT content FROM blogs.blog WHERE id=1"
        );
        res.json(result.rows[0].content);
    } catch (err) {
        res.json({ error: err });
    }
});

app.listen(port, () => {
    console.log("Server running at http://localhost:", port);
});
