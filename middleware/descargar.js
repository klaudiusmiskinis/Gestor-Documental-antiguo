function run(rutaRaiz, req, res) {
    let position = decodeURI(req.headers.cookie);
    position = position.split('=')[1];
    if(position == '%2F') {
        rutaArchivo = rutaRaiz + req.body.descargar;
    } else {
        let archivo = (req.body.descargar).split('%2F').join('/');
        position = position.split('%2F').join('/');
        rutaArchivo = rutaRaiz + position + '/' + archivo;
    }
    console.log('Descargando:', req.body.descargar);
}

module.exports = {
    run
};