require('dotenv').config();
const wrench = require('wrench');
var db = require('mysql2-promise')();
const fs = require('fs');
const ruta = process.env.RUTA_LOCAL;
recursivo(ruta)

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

        db.configure({host:'localhost', user: 'root', password: process.env.PWD ,database: process.env.DB_2});
        // LOOP para saber que archivo pertenece a que directorio
        allFiles.forEach(async (archivo) => {   
            let date = new Date();
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let year = date.getFullYear();
            date =  year + '/' + month +  '/' + day;
            let ultimaParte = archivo.split('/')
            ultimaParte = ultimaParte[ultimaParte.length -1];
            db.query(process.env.SQL_INSERTALL, [ultimaParte, archivo.split(ultimaParte)[0], date, 1]).then(function () {
                return db.query('SELECT * FROM archivos');
            }).spread(function() {
                console.log('Insertado', allFiles.length);
            });
        })
    }
}
