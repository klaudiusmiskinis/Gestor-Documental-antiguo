require('dotenv').config();
const wrench = require('wrench');
const fs = require('fs');
const ruta = process.env.RUTA_LOCAL;

const database = {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PWD,
    database : process.env.DB_2,
    queueLimit: 10000,
    multipleStatements: true,
    waitForConnections: true,
}
truncate();
recursivo(ruta);
home()

function recursivo(ruta) {
    let allDirectories = [];
    let allFiles = [];
    let dirFilter = [];

    recargar(allDirectories, allFiles, dirFilter);

    function recargar(allDirectories, allFiles, dirFilter) {
        var files = wrench.readdirSyncRecursive(ruta);
        files.forEach(archivo => {
            archivo = archivo.replace(/\\/g, '/');
            if (fs.lstatSync(ruta + archivo).isDirectory()) {
                allDirectories.push(archivo)
            } else if (fs.lstatSync(ruta + archivo).isFile()) {
                allFiles.push(archivo)
            }
        });

        dirFilter.push(
            dirObj = {
                nombre: '/',
                padre: ruta,
                rutaRelativa: null,
                rutaAbsoluta: ruta,
                archivos: []
            }
        )

        let array = []
        
        allFiles.forEach(async (archivo) => {   
            let date = new Date();
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let year = date.getFullYear();
            date =  year + '/' + month +  '/' + day;
            let ultimaParte = archivo.split('/');
            ultimaParte = ultimaParte[ultimaParte.length -1];
            array.push([ultimaParte, archivo.split(ultimaParte)[0], date, 1])
        })
        insert(array)
    }
}

async function truncate() {
    try {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(database);
        conn.query('TRUNCATE TABLE archivos')
        await conn.end();
    } catch (e) {
        return ('error')
    }
}

async function home() {
    try {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(database);
        conn.query("UPDATE `archivos` SET `ruta`='/' WHERE ruta = ''")
        await conn.end();
    } catch (e) {
        return ('error')
    }
}

async function insert(array) {
    try {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(database);
        conn.query(process.env.SQL_INSERTALL, [array])
        await conn.end();
    } catch (e) {
        return ('error')
    }
}