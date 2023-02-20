const yargs = require("yargs");
const contacts = require("./contacts");

yargs
    .command({
        command: "add",
        describe: "Add New Contact",
        builder: {
            nama: {
                describe: "Full Name",
                demandOption: true,
                type: "string",
            },
            noHp: {
                describe: "Full Name",
                demandOption: true,
                type: "string",
            },
            email: {
                describe: "Email Adress",
                demandOption: false,
                type: "string",
            },
        },
        handler(argv) {
            contacts.saveContact(argv.nama, argv.noHp, argv.email);
        },
    })
    .demandCommand();

yargs.command({
    command: "list",
    describe: "Get The All Contact List",
    handler() {
        contacts.listContact();
    },
});

yargs.command({
    command: "detail",
    describe: "Get The Detail Contact by Nama",
    builder: {
        nama: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

yargs.command({
    command: "delete",
    describe: "Delete The Spesific Given Contact",
    builder: {
        nama: {
            describe: "Full Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();
