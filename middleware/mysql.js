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
    const [rows] = await conn.execute(process.env.SQL_FINDUSER, [process.env.SUBDEPARTAMENTO]);
    await conn.end();
    return rows;
}

async function findArchivos() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseD);
    const [rows] = await conn.execute(process.env.SQL_ARCHIVOS);
    await conn.end();
    return rows;
}

async function findArchivoByNombre(nombre, ruta) {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseD);
    const [rows] = await conn.execute(process.env.SQL_FINDARCHIVOBYNOMBRE, [nombre, ruta]);
    await conn.end();
    return rows;
}

async function updateArchivoById(id, version) {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseD);
    const [rows] = await conn.execute(process.env.SQL_UPDATEARCHIVOBYID, [version, id]);
    await conn.end();
    return rows;
}

async function insertVersion(id, version, dni, motivo) {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(databaseD);
    const [rows] = await conn.execute(conn.format(process.env.SQL_INSERTVERSION, [[id, version, fecha(), dni, motivo]]));
    await conn.end();
    return rows;
}

function fecha() {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return year + '/' + month +  '/' + day;
}


// EXPORTS
module.exports = {
    findUserBySubdepartamento,
    findArchivoByNombre,
    updateArchivoById,
    insertVersion,
    findArchivos,
};