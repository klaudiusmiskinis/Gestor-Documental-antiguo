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
const rutaRaiz = 'C:/Users/Klau/AppData/Local/Programs/Microsoft VS Code/'
const estructura = []
const subDirectorios = []
try {
    inicializar(rutaRaiz)
    estructura.forEach(dir => {
        app.get('/' + dir.getNombre(), (req, res) => {
            res.render('index.ejs', { dir: dir = {
                nombre: dir.getNombre(),
                ruta: dir.getRuta(),
                archivos: dir.getArchivos(),
                subDirectorios: dir.getInnerDir()
            } })
        })
    })
} catch (e) {
    console.log(e)
}

// Config
app.set('view engine', 'ejs')

// Funciones 
function inicializar(ruta) {
    fs.readdirSync(ruta).forEach(dir => {
    let type = fs.lstatSync(ruta + dir)
        if(type.isDirectory()) {
            console.log(ruta + dir)
            let dirObj = new Directorio(dir, (ruta + dir + '/'))
            dirObj.setArchivos(dirObj.getFiles())
            dirObj.setSubDirectorios(dirObj.getInnerDir())
            estructura.push(dirObj)
        }
    });
}

// HTTP METHODs
app.get('/', (req, res) => {
    console.log(subDirectorios)
    res.redirect('/' + estructura[0].getNombre())
})

app.listen(3000)