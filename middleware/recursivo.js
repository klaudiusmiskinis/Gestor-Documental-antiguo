const wrench = require('wrench');
const _ = require('underscore');
const fs = require('fs');

function recursivo(rutaRaiz) {
    let allDirectories = [];
    let allFiles = [];
    let dirFilter = [];
    let nomRutas = [];

    recargar(allDirectories, allFiles, dirFilter, nomRutas);

    function rutas(dir) {
        if (dir.padre == rutaRaiz) {
            return dir.nombre
        } else {
            return dir.rutaRelativa
        }
    };

    function recargar(allDirectories, allFiles, dirFilter, nomRutas) {

        var files = wrench.readdirSyncRecursive(rutaRaiz);

        files.forEach(archivo => {
            archivo = archivo.replace(/\\/g, '/');
            if (fs.lstatSync(rutaRaiz + archivo).isDirectory()) {
                allDirectories.push(archivo)
            } else if (fs.lstatSync(rutaRaiz + archivo).isFile()) {
                allFiles.push(archivo)
            };
        });

        dirFilter.push(
            dirObj = {
                nombre: '/',
                padre: rutaRaiz,
                rutaRelativa: null,
                rutaAbsoluta: rutaRaiz,
                archivos: []
            }
        );
        
        allDirectories.forEach(dir => {
            let separador = dir.split('/');
            let directorio = getPadre(separador);
            function getPadre(separador) {
                if (separador.length > 1) {
                    let directorioObj = {
                        nombre: separador[separador.length -1],
                        padre: separador[separador.length -2] + '/',
                        rutaRelativa: dir,
                        rutaAbsoluta: rutaRaiz + dir + '/',
                        archivos: []
                    };
                    return directorioObj;  
                } else {
                    let directorioObj = {
                        nombre: separador[separador.length -1],
                        padre: '/',
                        rutaRelativa: dir,
                        rutaAbsoluta: rutaRaiz + dir,
                        archivos: []
                    };
                    return directorioObj; 
                }
            }    
            dirFilter.push(directorio);
        })

        // LOOP de nombre de rutas para el HTTP
        dirFilter.forEach(directorio => {
            nomRutas.push(rutas(directorio))
        });
        
        // LOOP para saber que archivo pertenece a que directorio
        allFiles.forEach(archivo => {   
            let separador = archivo.split('/')
            dirFilter.find(directorio => {
                if (separador.length == 1 && directorio.nombre == '/') {
                    directorio.archivos.push(separador[0])
                } else if (separador.length == 2 && directorio.nombre == separador[0] && directorio.padre == '/') {
                    directorio.archivos.push(separador[1])
                };

                if (directorio.nombre == separador[separador.length-2] && directorio.padre == ((separador[separador.length-3]) + '/'))  {
                    directorio.archivos.push(separador[separador.length-1])
                } else if (directorio.nombre == separador) {
                    directorio.archivos.push(separador)
                };
            })
        })
    }
    return [allDirectories, allFiles, dirFilter, nomRutas];
}

function directorio(nombre, allFiles, dirFilter) {
    let directorioObj = {
        nombre: nombre,
        hijos: [],
        archivos: [],
        extensiones: [],
        cantidadArchivos: allFiles.length,
        cantidadCarpetas: dirFilter.length
    };

    dirFilter.find(dir => {
        if (dir.padre == nombre) {
            directorioObj.hijos.push(dir);
        } else if ((nombre + '/' + dir.nombre) == dir.rutaRelativa) {
            directorioObj.hijos.push(dir);
        };

        if (dir.nombre == '/') {
            directorioObj.archivos = dir.archivos;
        } else if (dir.rutaRelativa == nombre) { 
            directorioObj.archivos = dir.archivos;
            directorioObj.archivos = _.without(directorioObj.archivos, 'Thumbs.db');
        };
    });

    directorioObj.archivos.forEach(archivo => {
        let extension = archivo.split('.');
        extension = extension[extension.length - 1];
        directorioObj.extensiones.push(extension);
    });
    return directorioObj;
};

module.exports = {
   recursivo,
   directorio
};