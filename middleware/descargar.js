const { listarCookies } = require('../middleware/cookie');

function run(rutaRaiz, req, res) {
    let lista = listarCookies(req.headers.cookie);
    let position = lista.position;
    if (position == '%2F') {
        rutaArchivo = rutaRaiz + req.body.descargar;
    } else {
        let archivo = (req.body.descargar).split('%2F').join('/');
        position = decodeURI(position)
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + position + '/' + archivo;
    }
    console.log('Descargando:', req.body.descargar);
}

module.exports = {
    run
};