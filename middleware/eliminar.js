const fs = require('fs');

async function run(rutaRaiz, req, res){
    let rutaArchivo = '';
    let position = decodeURI(req.headers.cookie)
    position = position.split('=')[1];

    if(position == '%2F') {
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