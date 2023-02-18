// import core modules

const fs = require("fs");
const readline = require("readline");

// // memsasukan text ke file synchronous
// try {
//     fs.writeFileSync("data/message.txt", "Hello World synchronous!");
// } catch (err) {
//     console.log("Something Went Wrong!");
// }

// // memsasukan text ke file synchronous

// fs.writeFile("data/message.txt", "Hello World Asynchronous", (e) => {
//     console.log(e);
// });

// // membaca isi file synchronous

// const data = fs.readFileSync("data/message.txt");
// console.log(data.toString());

// // membaca isi file asynchronous
// fs.readFile("data/message.txt", "utf-8", (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });

// // memasukan data
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Masukan Nama Anda ? ", (nama) => {
    rl.question("Masukan Nomor Handphone Anda ? ", (hp) => {
        const ourNewMember = { nama, hp };

        let data = fs.readFileSync("data/contacts.json", "utf-8");
        data = JSON.parse(data);
        data.push(ourNewMember);
        data = JSON.stringify(data);

        fs.writeFileSync("./data/contacts.json", data, (e) => {
            console.log(e);
        });

        console.log(`Terimakasih ${nama}, Nomor Hp Anda Sudah Terdaftar`);
        rl.close();
    });
});
