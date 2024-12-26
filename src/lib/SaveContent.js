const axios = require("axios");

function saveContent(title, content) {
    axios
        .post("http://localhost:4000/createblog", {
            content: content,
            title: title,
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = saveContent;
