const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch } = require('os');
const express = require('express')
const path = require('path');
const fs = require('fs');
const app = express()

const Directorio = require('./clases/directorio');

// Variables
const rutaRaiz = 'C:/Users/Klau/Desktop/Avorion.v2.0/Avorion.v2.0/'
const estructura = []

// Config
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    try {
        inicializar(rutaRaiz)
    } catch (e) {
        console.log('Error en la inicialización.')
    }
    estructura.forEach(carpeta => {
        console.log(carpeta.getNombre())
    })
})

app.listen(3000)

async function inicializar(ruta) {
    await fs.readdirSync(ruta).forEach(dir => {
        if(!dir.includes('.')){
            let dirObj = new Directorio(dir, (ruta + dir + '/'))
            dirObj.setArchivos(dirObj.getFiles())
            dirObj.setSubDirectorios(dirObj.getInnerDir())
            estructura.push(dirObj)
        }
    });
}