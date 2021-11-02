function run(rutaRaiz, req, res) {
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];
    if(decode == '%2F') {
        rutaArchivo = rutaRaiz + req.body.descargar;
    } else {
        let archivo = (req.body.descargar).split('%2F').join('/');
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + archivo;
    }
    console.log('Descargando:', req.body.descargar);
}

module.exports = {
    run
};