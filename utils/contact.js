const fs = require("fs");

const folderPath = "./data";
if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath, (err) => {
        throw err;
    });
}

const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
}

const getDataContacts = () => {
    const data = fs.readFileSync("./data/contacts.json", "utf-8");
    return JSON.parse(data);
};

const getDetailContacts = (nama) => {
    const data = getDataContacts();
    return data.find((contact) => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    });
};

const addDataContact = (contact) => {
    const data = getDataContacts();
    data.push(contact);
    fs.writeFileSync(filePath, JSON.stringify(data));
};

const checkDuplicate = (nama) => {
    const data = getDataContacts();
    return data.find((contact) => {
        return contact.nama === nama;
    });
};

module.exports = { getDataContacts, getDetailContacts, addDataContact, checkDuplicate };
