// @ts-check
const { urlencoded } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const { getDataContacts, getDetailContacts, addDataContact, checkDuplicate } = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");

// require flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// use flash
app.use(cookieParser("secret"));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// gunakan ejs
app.set("view engine", "ejs");

// third-party middleware
app.use(morgan("dev"));

// built-in function middlewere
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

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
        success: req.flash("success"),
    });
});

app.post(
    "/contact",
    [
        body("nama").custom((value) => {
            if (checkDuplicate(value)) {
                throw new Error("Nama is already taken!");
            }
            return true;
        }),
        check("email", "Email is not valid!").isEmail(),
        check("nohp", "No HandPhone is not valid!").isMobilePhone("id-ID"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("contact-add", {
                title: "Add New Contact Failed!",
                errors: errors.array(),
            });
        } else {
            addDataContact(req.body);
            req.flash("success", "Add New Contact Success!");
            res.redirect("/contact");
        }
    }
);

app.get("/contact/add", (req, res) => {
    res.render("contact-add", {
        title: "Add New Contact",
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
