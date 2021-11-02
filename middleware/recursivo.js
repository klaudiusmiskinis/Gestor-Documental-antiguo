const wrench = require('wrench');
const _ = require('underscore');
const fs = require('fs');

function recursivo(rutaRaiz) {
    let allDirectories = [];
    let allFiles = [];
    let dirFilter = [];
    let nomRutas = [];

    actualizar();

    function rutas(dir) {
        if(dir.padre == rutaRaiz) {
            return dir.nombre
        } else {
            return dir.rutaRelativa
        }
    };

    function actualizar() {
        allDirectories = []
        allFiles = []
        dirFilter = []
        nomRutas = []

        var files = wrench.readdirSyncRecursive(rutaRaiz);
        wrench.readdirRecursive(rutaRaiz, function (error, files) {});

        files.forEach(file => {
            file = file.replace(/\\/g, '/');
            if(fs.lstatSync(rutaRaiz + file).isDirectory()) {
                allDirectories.push(file)
            } else if(fs.lstatSync(rutaRaiz + file).isFile()) {
                allFiles.push(file)
            }
        });

        dirFilter.push(
            dirObj = {
                nombre: '/',
                padre: rutaRaiz,
                rutaRelativa: null,
                rutaAbsoluta: rutaRaiz,
                archivos: []
            }
        )
        
        allDirectories.forEach(dir => {
            let separador = dir.split('/')
            let directorio = getPadre(separador)
            function getPadre(sep) {
                if (sep.length > 1) {
                    let dirObj = {
                        nombre: sep[sep.length -1],
                        padre: sep[sep.length -2] + '/',
                        rutaRelativa: dir,
                        rutaAbsoluta: rutaRaiz + dir + '/',
                        archivos: []
                    }
                    return dirObj;  
                } else {
                    let dirObj = {
                        nombre: sep[sep.length -1],
                        padre: '/',
                        rutaRelativa: dir,
                        rutaAbsoluta: rutaRaiz + dir,
                        archivos: []
                    } 
                    return dirObj; 
                }
            }    
            dirFilter.push(directorio)
        })

        // LOOP de nombre de rutas para el HTTP
        dirFilter.forEach(dir => {
            nomRutas.push(rutas(dir))
        })
        
        // LOOP para saber que archivo pertenece a que directorio
        allFiles.forEach(file => {   
            let separador = file.split('/')
            dirFilter.find(dir => {

                if(separador.length == 1 && dir.nombre == '/') {
                    dir.archivos.push(separador[0])
                } else if(separador.length == 2 && dir.nombre == separador[0] && dir.padre == '/') {
                    dir.archivos.push(separador[1])
                }

                if (dir.nombre == separador[separador.length-2] && dir.padre == ((separador[separador.length-3]) + '/'))  {
                    dir.archivos.push(separador[separador.length-1])
                } else if (dir.nombre == separador) {
                    dir.archivos.push(separador)
                }

            })
        })
    }
    return [allDirectories, allFiles, dirFilter, nomRutas];
}

function directorio(nom, allFiles, dirFilter) {
    let data = {
        nom: nom,
        hijos: [],
        archivos: [],
        extensiones: [],
        cantidadArchivos: allFiles.length,
        cantidadCarpetas: dirFilter.length
    };

    dirFilter.find(dir => {
        if (dir.padre == nom) {
            data.hijos.push(dir);
        } else if ((nom + '/' + dir.nombre) == dir.rutaRelativa) {
            data.hijos.push(dir);
        }

        if (dir.nombre == '/') {
            data.archivos = dir.archivos;
        } else if(dir.rutaRelativa == nom) { 
            data.archivos = dir.archivos;
            data.archivos = _.without(data.archivos, 'Thumbs.db')
        } 
    });

    data.archivos.forEach(archivo => {
        let extension = archivo.split('.')
        extension = extension[extension.length - 1]
        data.extensiones.push(extension)
    })
    return data;
};

module.exports = {
   recursivo,
   directorio
};