// // synchronous single thread js

// const getDataUser = (id) => {
//     const nama = id === 1 ? "Kevin Almer" : "Kerin Dwi Almira";
//     return { id, nama };
// };

// console.log(getDataUser(1));

// console.log(getDataUser(2));

// console.log("selesai");

// synchronous single thread js

const getDataUser = (id, cb) => {
    const time = id === 1 ? 3000 : 2000;
    const nama = id === 1 ? "Kevin Almer" : "Kerin Dwi Almira";

    setTimeout(() => {
        cb({ id, nama });
    }, time);
};

const userSatu = getDataUser(1, (data) => {
    console.log(data);
});

const userDua = getDataUser(2, (data) => {
    console.log(data);
});

console.log("selesai");
