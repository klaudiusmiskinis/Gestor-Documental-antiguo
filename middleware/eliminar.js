const fs = require('fs');
const { listarCookies } = require('../middleware/cookie');
async function run(rutaRaiz, req, res){
    let rutaArchivo;
    let lista = listarCookies(req.headers.cookie);
    let position = lista.position;

    if (position == '%2F') {
        rutaArchivo = rutaRaiz + req.body.eliminarArchivoOculto;
    } else {
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + position + '/' + req.body.archivo;
    }
    try {
        await fs.unlinkSync(rutaArchivo);
    } catch(e) {
        return e;
    }
    console.log('Eliminando:', req.body.eliminarArchivoOculto);
}

module.exports = {
    run
};