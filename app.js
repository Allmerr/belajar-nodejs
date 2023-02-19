const contacts = require("./contacts");

const main = async () => {
    const nama = await contacts.buatPertanyaan("Masukan Nama Anda ? ");
    const nomor = await contacts.buatPertanyaan("Masukan nomor Anda ? ");
    const email = await contacts.buatPertanyaan("Masukan Email Anda ? ");

    contacts.simpanContacts(nama, nomor, email);
};

main();
