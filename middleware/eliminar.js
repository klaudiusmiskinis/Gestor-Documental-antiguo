const fs = require('fs');
const cookies = require('../middleware/cookie');

async function run(rutaRaiz, req, res){
    let rutaArchivo = '';
    let lista = cookies.listarCookies(req.headers.cookie);
    let position = lista.position;

    if (position == '%2F') {
        rutaArchivo = rutaRaiz + req.body.archivo;
    } else {
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + position + '/' + req.body.archivo;
    }

    try {
        await fs.unlinkSync(rutaArchivo);
    } catch(err) {
       console.error(err);
    }
    console.log('Eliminando:', req.body.archivo);
}

module.exports = {
    run
};