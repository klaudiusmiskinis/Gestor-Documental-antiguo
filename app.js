const { throws } = require('assert');
const { dir } = require('console');
const fs = require('fs');
const { get } = require('http');
const { arch } = require('os');
const path = require('path');
const Directorio = require('./clases/directorio');

// Variables
const rutaRaiz = '//serverdoc/E/z_Informatica/'
const directorios = []

getDir(rutaRaiz)

function getDir(ruta) {
    fs.readdirSync(ruta).forEach(dir => {
        if(!dir.includes('.')){
            let dirObj = new Directorio(dir, ruta)
            let archivos = getFiles(rutaRaiz + dir + '/')
            dirObj.setArchivos(archivos)
            directorios.push(dirObj)
            console.log(directorios)
        }
    });
}

function getFiles(ruta) {
    let archivos = []
    fs.readdirSync(ruta).forEach(file => {
        if(file.includes('.')){
            archivos.push(file)
        }
    });
    return archivos
}
