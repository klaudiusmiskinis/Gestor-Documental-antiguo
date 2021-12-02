require('dotenv').config();
const mysql = require('mysql2');

const conexion = async (database) => {
    return await mysql.createConnection({
        host     : process.env.HOST,
        user     : process.env.USER,
        password : process.env.PWD,
        database : database
    });
}

function findUserBySubdepartamento(subdepartamento) {
    return new Promise(async (resolve, reject) => {
        try {
            let db = await conexion(process.env.DB_1);
            db.query(
                mysql.format("SELECT dni, nombre, apellido FROM login WHERE subdepartamento = ?", subdepartamento),
                function(err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                }
            );
            db.end();
        } catch (err) {
            reject(err);
        }
    });
}

// EXPORTS
module.exports = {
    conexion,
    findUserBySubdepartamento,
};