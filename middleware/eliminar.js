const fs = require('fs');

async function run(rutaRaiz, req, res){
    let rutaArchivo = '';
    let decode = decodeURI(req.headers.cookie)
    decode = decode.split('=')[1];

    if(decode == '%2F') {
        rutaArchivo = rutaRaiz + req.body.archivo;
    } else {
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + req.body.archivo;
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