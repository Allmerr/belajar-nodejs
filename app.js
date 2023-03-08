// require mongodb
const { MongoClient, ObjectId } = require("mongodb");

// conection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "nodejs";

async function main() {
    // connect to db
    await client.connect();
    console.log("Connect to mongo success!");

    // set variable collection
    const db = client.db(dbName);
    const collection = db.collection("mahasiswa");

    // # insert one data
    // const insertResult = await collection.insertOne({
    //     nama: "Kibo",
    //     email: "kibo@gaming.com",
    // });
    // console.log(insertResult);

    // # insert many data
    // const insertResult = await collection.insertMany([
    //     {
    //         nama: "putih",
    //         email: "putih@gmail.com",
    //     },
    //     {
    //         nama: "belang",
    //         email: "belang@gmail.com",
    //     },
    // ]);
    // console.log(insertResult);

    // # see all data collection
    // const findResult = await collection.find().toArray();
    // console.log(findResult);

    // # see a spesific document in collection
    // const findResult = await collection.find({ _id: new ObjectId("64087a626ae1400296dd1b04") }).toArray();
    // console.log(findResult);

    // # update a document
    // const updateResult = await collection.updateOne(
    //     {
    //         _id: new ObjectId("64087a626ae1400296dd1b04"),
    //     },
    //     {
    //         $set: {
    //             email: "putihgaming@gmail.com",
    //         },
    //     }
    // );
    // console.log(updateResult);

    // # update multiple document
    // const updateResult = await collection.updateMany(
    //     {
    //         nama: "Kibo",
    //     },
    //     {
    //         $set: {
    //             nama: "alm. Kibo",
    //         },
    //     }
    // );
    // console.log(updateResult);

    // # delete a document
    // const deleteResult = await collection.deleteOne({
    //     _id: new ObjectId("64087a626ae1400296dd1b04"),
    // });
    // console.log(deleteResult);

    // # delete multiple document
    const deleteResult = await collection.deleteMany({
        nama: "alm. Kibo",
    });
    console.log(deleteResult);

    // bye bye
    console.log("bye!");
}

main()
    .then()
    .catch()
    .finally(() => client.close());
