const { dir } = require('console');
const fs = require('fs');
const { get } = require('http');
const path = require('path')

const rutaRaiz = '//serverdoc/E/z_Informatica/'

let dirUno = []

getDir(rutaRaiz)

function getDir(ruta) {
    fs.readdirSync(ruta).forEach(file => {
        if(!file.includes('.')){
            dirUno.push(file)
            console.log(f)
        }
    });

    dirUno.forEach(dir => {
        if (dir == 'Z_Documentacio') {
            let a = rutaRaiz + dir +'/'
            getFiles(a)
        }
    })
}

function getFiles(ruta) {
    fs.readdirSync(ruta).forEach(file => {
        if(file.includes('.')){
            dirUno.push(file)
            console.log(f)
        }
    });
}