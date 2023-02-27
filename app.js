// @ts-check
const express = require("express");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

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

app.get("/product/:id/kategori/:kategori", (req, res) => {
    res.send(`Product nomor ${req.params.id} dengan kategori ${req.params.kategori} tersedia`);
});

app.use((req, res) => {
    res.header(404);
    res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
