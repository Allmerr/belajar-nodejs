const chalk = require("chalk");
const fs = require("fs");
const validator = require("validator");

const folderPath = "./data";
if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath);
}

const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
}

const getDataContacts = () => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

const saveContact = (nama, noHp, email) => {
    const data = { nama, email, noHp };
    const contacts = getDataContacts();

    const isDuplicatedName = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (isDuplicatedName) {
        return console.log(chalk.bgRed("Name Has Been Taken, Add New Contact Has Been Failed!"));
    }

    if (!validator.isMobilePhone(noHp, "id-ID")) {
        return console.log(chalk.bgRed("Your Nomor Phone Incorect, Add New Contact Has Been Failed!"));
    }

    contacts.push(data);
    fs.writeFileSync(filePath, JSON.stringify(contacts));
    return console.log(chalk.bgGreen("Add New Contact Has Done Successful!"));
};

const listContact = () => {
    const contacts = getDataContacts();
    console.log(chalk.bgGreen("All List Contact"));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
};

const detailContact = (nama) => {
    const contacts = getDataContacts();
    const isGet = contacts.find((contact) => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    });
    if (isGet) {
        console.log(chalk.bgGreen(`Name ${nama} is Found, Get Detail Contact Successful!`));
        if (isGet.email) {
            return console.log(`${isGet.nama} - ${isGet.noHp} - ${isGet.email}`);
        } else {
            return console.log(`${isGet.nama} - ${isGet.noHp}`);
        }
    } else {
        return console.log(chalk.bgRed(`Name ${nama} is not Found, Get Detail Contact Failed!`));
    }
};

const deleteContact = (nama) => {
    const contacts = getDataContacts();
    const newContacts = [];
    contacts.forEach((contact) => {
        if (contact.nama.toLowerCase() !== nama.toLowerCase()) {
            newContacts.push(contact);
        }
    });

    if (contacts.length === newContacts.length) {
        return console.log(chalk.bgRed(`Name ${nama} is not Found, Delete Spesific Contact Failed!`));
    }

    fs.writeFileSync(filePath, JSON.stringify(newContacts));

    console.log(chalk.bgGreen(`Name ${nama} is Found, Contact  Has Been DeleteSuccessful!`));
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
