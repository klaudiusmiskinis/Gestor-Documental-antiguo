require('dotenv').config();

const databaseU = {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PWD,
    database : process.env.DB_1
}

const databaseD = {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PWD,
    database : process.env.DB_2
}

async function findUserBySubdepartamento() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseU);
    const [rows, fields] = await conn.execute(process.env.SQL_FINDUSER, [process.env.SUBDEPARTAMENTO]);
    await conn.end();
    return rows;
}

async function findArchivos() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseD);
    const [rows, fields] = await conn.execute(process.env.SQL_ARCHIVOS);
    await conn.end();
    return rows;
}

// EXPORTS
module.exports = {
    findUserBySubdepartamento,
    findArchivos,
};