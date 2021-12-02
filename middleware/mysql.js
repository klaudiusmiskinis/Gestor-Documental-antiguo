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

function findUserByDNI(dni) {
    return new Promise(async (resolve, reject) => {
        try {
            let db = await conexion(process.env.DB_1);
            db.query(
                mysql.format("SELECT Nombre, Apellido, DNI, Email, Imagen, Departamento, Subdepartamento  FROM login WHERE dni = ?", [dni]),
                function(err, rows) {
                    if (err) {
                        reject(err);
                    }
                    let user = rows[0];
                    resolve(user);
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
    findUserByDNI,
};