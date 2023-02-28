// @ts-check
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const { getDataContacts, getDetailContacts } = require("./utils/contact");

// gunakan ejs
app.set("view engine", "ejs");

// third-party middleware
app.use(morgan("dev"));

// built-in function middlewere
app.use(express.static("public"));

// route
app.get("/", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    const mahasiswa = [
        {
            nama: "kevin almer",
            email: "kevinalmer4@gmail.com",
        },
        {
            nama: "Kerin Dwi Almira",
            email: "kerindwi@gmail.com",
        },
    ];
    res.render("index", {
        nama: "Kevin Almer",
        title: "Home",
        mahasiswa,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        contacts: getDataContacts(),
    });
});

app.get("/contact/:nama", (req, res) => {
    const contact = getDetailContacts(req.params.nama);
    res.render("contact-detail", {
        title: "Contact Detail",
        contact,
    });
});

app.use((req, res) => {
    res.header(404);
    res.send("<h1>404</h1>");
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
