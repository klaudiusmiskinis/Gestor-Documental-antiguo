const fs = require('fs');
const mysql = require('./mysql')
const { listarCookies } = require('../middleware/cookie');

async function run(rutaRaiz, req, res) {
    let rutaArchivo = '';
    console.log(req.body);
    let lista = listarCookies(req.headers.cookie);
    let position = lista.position;
    let archivo = req.files.archivoContenidoOculto;
    let nombre = req.body.archivoOculto;
    let nombreArchivoSimple = req.body.nombreArchivoSimple;
    let archivoEncontrado = await mysql.findArchivoByNombre(nombreArchivoSimple);
    archivoEncontrado = archivoEncontrado[archivoEncontrado.length - 1]
    archivo.name = nombre;
    if (archivoEncontrado) {
        await mysql.updateArchivoById(archivoEncontrado.idArchivo, req.body.versionOculto);
        await mysql.insertVersion(archivoEncontrado.idArchivo, req.body.versionOculto, req.body.dni, req.body.motivo)
    }
    if (req.files) {
        if (position == '%2F') {
            rutaArchivo = rutaRaiz + archivo.name;
        } else {
            position = position.split('%2F').join('/');
            rutaArchivo = rutaRaiz + position + '/' + archivo.name;
        }
        try {
            if (!fs.existsSync(rutaArchivo)) {
                await archivo.mv(rutaArchivo);
            } else {
                let renombrar;
                let version = req.query.version;
                let nombre = (archivo.name).split('.');
                let cambiar = nombre[0].slice(nombre[0].length-2);
                renombrar = nombre[0] + '_' + version  + '.' + nombre[1];
                if (cambiar.includes('_')) {
                    renombrar = renombrar.split(cambiar).join('')
                }
                if (position == '%2F') {
                    rutaArchivo = rutaRaiz + renombrar;
                } else {
                    position = position.split('%2F').join('/');
                    rutaArchivo = rutaRaiz + position + '/' + renombrar;
                }
                await archivo.mv(rutaArchivo);
            }
        } catch(e) {
            return e;
        }
        console.log('Guardando', archivo.name)
    }
}

module.exports = {
    run
 };