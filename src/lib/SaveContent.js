const axios = require("axios");

async function saveContent(title, content, owner, router) {
    try {
        axios
            .post("http://localhost:4000/createblog", {
                content: content,
                title: title,
                owner: owner,
            })
            .then(() => {
                router.push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = saveContent;
