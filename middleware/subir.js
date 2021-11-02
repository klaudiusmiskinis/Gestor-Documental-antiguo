const fs = require('fs');

async function run(rutaRaiz, req, res) {
    let rutaArchivo = '';
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];
    if (req.files) {
        if(decode == '%2F') {
            rutaArchivo = rutaRaiz + req.files.file_data.name;
        } else {
            decode = decode.split('%2F').join('/');
            rutaArchivo = rutaRaiz + decode + '/' + req.files.file_data.name;
        }
        try {
            if(!fs.existsSync(rutaArchivo)) {
                await req.files.file_data.mv(rutaArchivo);
                } else {
                    if(req.query) {
                    let renombrar;
                    if (req.query.nuevaversion == 'true') {
                        let version = req.query.version;
                        let nombre = (req.files.file_data.name).split('.');
                        let cambiar = nombre[0].slice(nombre[0].length-2);
                        renombrar = nombre[0] + '_' + version  + '.' + nombre[1];
                        if (cambiar.includes('_')) {
                            renombrar = renombrar.split(cambiar).join('')
                        }
                        if(decode == '%2F') {
                            rutaArchivo = rutaRaiz + renombrar;
                        } else {
                            decode = decode.split('%2F').join('/');
                            rutaArchivo = rutaRaiz + decode + '/' + renombrar;
                        }
                        await req.files.file_data.mv(rutaArchivo);
                    } else {
                        await req.files.file_data.mv(rutaArchivo);
                    }
                }
                console.log('Guardar', renombrar)
            }
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = {
    run
 };