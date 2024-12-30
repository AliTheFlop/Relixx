const axios = require("axios");
const jwt = require("jsonwebtoken");

async function getUserDetails() {
    const response = await axios.get("http://localhost:4000/auth/info");

    return response;
}

async function saveContent(title, content) {
    console.log(await getUserDetails());

    //const userData = jwt.verify(token, process.env.JWT_SECRET);

    try {
        axios
            .post("http://localhost:4000/createblog", {
                content: content,
                title: title,
                owner: owner,
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = saveContent;
