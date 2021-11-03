const fs = require('fs');

async function run(rutaRaiz, req, res) {
    let rutaArchivo = '';
    let position = decodeURI(req.headers.cookie);
    position = position.split('=')[1];
    if (req.files) {
        if(position == '%2F') {
            rutaArchivo = rutaRaiz + req.files.file_data.name;
        } else {
            position = position.split('%2F').join('/');
            rutaArchivo = rutaRaiz + position + '/' + req.files.file_data.name;
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
                        if(position == '%2F') {
                            rutaArchivo = rutaRaiz + renombrar;
                        } else {
                            position = position.split('%2F').join('/');
                            rutaArchivo = rutaRaiz + position + '/' + renombrar;
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