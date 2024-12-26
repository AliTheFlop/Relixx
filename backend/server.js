const express = require("express");
const client = require("./db.js");
const cors = require("cors");
const generateUniqueSlug = require("./lib.js");
const he = require("he");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const app = express();
const port = 4000;

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:4000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());

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

app.listen(port, () => {
    console.log("Server running at http://localhost:", port);
});
