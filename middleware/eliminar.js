const fs = require('fs');
const { listarCookies } = require('./cookie');
const mysql = require('./mysql')

async function run(rutaRaiz, req, res){
    let rutaArchivo;
    let lista = listarCookies(req.headers.cookie);
    let position = lista.position;

    if (position == '%2F') {
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + req.body.eliminarArchivoOculto;
    } else {
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + position + '/' + req.body.eliminarArchivoOculto;
    }

    try {
        const archivoEncontrado = await mysql.findArchivoByNombre(req.body.eliminarArchivoSimpleOculto, position)
        await mysql.deleteArchivo(archivoEncontrado[archivoEncontrado.length -1].idArchivo)
        await fs.unlinkSync(rutaArchivo);
    } catch(e) {
        return e;
    }
    console.log('Eliminando:', req.body.eliminarArchivoOculto);
}

module.exports = {
    run
};