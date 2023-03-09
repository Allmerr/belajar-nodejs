const express = require("express"); // require express

const methodOverride = require("method-override");

const app = express(); // use express
const port = 3000;

app.set("view engine", "ejs"); // set view engine ejs
app.use(express.static("public")); //  use public as static
app.use(express.urlencoded({ extended: true })); // use get and post as body

// use contact model
const ContactsModel = require("./model/contact");

// require express-validator
const { check, body, validationResult } = require("express-validator");

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

// use methodOverride
app.use(methodOverride("_method"));

// halaman home
app.get("/", (req, res) => {
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

// halaman about
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});

// halaman contact
app.get("/contact", async (req, res) => {
    const contacts = await ContactsModel.find();
    res.render("contact", {
        title: "Contact",
        contacts: contacts,
        success: req.flash("success"),
    });
});

// form tambah data
app.get("/contact/add", (req, res) => {
    res.render("contact-add", {
        title: "Add New Contact",
    });
});

// proses simpan data
app.post(
    "/contact",
    [
        body("nama").custom(async (value) => {
            const duplikat = await ContactsModel.findOne({ nama: value });
            if (duplikat) {
                throw new Error("Nama is already taken!");
            }
            return true;
        }),
        check("email", "Email is not valid!").isEmail(),
        check("nohp", "No HandPhone is not valid!").isMobilePhone("id-ID"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("contact-add", {
                title: "Add New Contact Failed!",
                errors: errors.array(),
            });
        } else {
            await ContactsModel.insertMany(req.body);
            req.flash("success", "Edit A Contact Success!");
            res.redirect("/contact");
        }
    }
);

// delete contact
app.delete("/contact/", async (req, res) => {
    await ContactsModel.deleteOne({ nama: req.body.nama });
    req.flash("success", "Delete A Contact Success!");
    res.redirect("/contact");
});

// edit form contact
app.get("/contact/edit/:nama", async (req, res) => {
    const contact = await ContactsModel.findOne({ nama: req.params.nama });
    res.render("contact-edit", {
        title: "Edit Contact",
        contact,
    });
});

// update a contact
app.put(
    "/contact",
    [
        body("nama").custom(async (value, { req }) => {
            const duplikat = await ContactsModel.findOne({ nama: value });
            if (duplikat && req.body.nama !== req.body.namaOld) {
                throw new Error("Nama is already taken!");
            }
            return true;
        }),
        check("email", "Email is not valid!").isEmail(),
        check("nohp", "No HandPhone is not valid!").isMobilePhone("id-ID"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        const data = await ContactsModel.findOne({ nama: req.body.namaOld });
        if (!errors.isEmpty()) {
            return res.render("contact-edit", {
                title: "Edit A Contact Failed!",
                errors: errors.array(),
                contact: data,
            });
        } else {
            await ContactsModel.updateOne({ _id: req.body._id }, { $set: { nama: req.body.nama, nohp: req.body.nohp, email: req.body.email } });
            req.flash("success", "Edit A Contact Success!");
            res.redirect("/contact");
        }
    }
);

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
    const contact = await ContactsModel.findOne({ nama: req.params.nama });
    res.render("contact-detail", {
        title: "Contact Detail",
        contact,
    });
});

app.listen(port, () => {
    console.log(`Listen to port http://localhost:${port}`);
});
