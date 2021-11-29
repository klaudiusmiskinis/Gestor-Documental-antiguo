const fs = require('fs');
const { listarCookies } = require('../middleware/cookie');

async function run(rutaRaiz, req, res) {
    let rutaArchivo = '';
    let lista = listarCookies(req.headers.cookie);
    let position = lista.position;
    let reqArchivo = req.files.archivoContenidoOculto;
    let nombre = req.body.archivoOculto;
    reqArchivo.name = nombre
    if (req.files) {
        if (position == '%2F') {
            rutaArchivo = rutaRaiz + reqArchivo.name;
        } else {
            position = position.split('%2F').join('/');
            rutaArchivo = rutaRaiz + position + '/' + reqArchivo.name;
        }
        try {
            if (!fs.existsSync(rutaArchivo)) {
                await reqArchivo.mv(rutaArchivo);
            } else {
                let renombrar;
                if (req.query) {
                    if (req.query.nuevaversion == 'true') {
                        let version = req.query.version;
                        let nombre = (reqArchivo.name).split('.');
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
                        await reqArchivo.mv(rutaArchivo);
                    } else {
                        await reqArchivo.mv(rutaArchivo);
                    }
                }
                console.log('Guardando', reqArchivo.name)
            }
        } catch(e) {
            return e;
        }
    }
}

module.exports = {
    run
 };