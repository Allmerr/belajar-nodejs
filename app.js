const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
    res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.sendFile("./views/contact.html", { root: __dirname });
});

app.use("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(port, () => {
    console.log("Listening to http://localhost:3000");
});
