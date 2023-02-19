// import core modules

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// cek ketersedian folder
const pathFolder = "./data";
if (!fs.existsSync(pathFolder)) {
    fs.mkdir(pathFolder, (e) => this);
}

// cek ketersedian file
const pathFile = "./data/contacts.json";
if (!fs.existsSync(pathFile)) {
    fs.writeFileSync(pathFile, "[]", "utf-8");
}

const buatPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        return rl.question(pertanyaan, (hasilJawabanPertanyaan) => {
            resolve(hasilJawabanPertanyaan);
        });
    });
};

const simpanContacts = (nama, nomor, email) => {
    const ourNewMember = { nama, nomor, email };

    let data = fs.readFileSync("data/contacts.json", "utf-8");
    data = JSON.parse(data);
    data.push(ourNewMember);
    data = JSON.stringify(data);

    fs.writeFileSync("./data/contacts.json", data, (e) => {
        console.log(e);
    });

    console.log(`Terimakasih ${nama}, Nomor Hp Anda Sudah Terdaftar`);
    rl.close();
};

module.exports = { buatPertanyaan, simpanContacts };
