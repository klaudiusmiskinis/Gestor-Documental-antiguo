const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch } = require('os');
const express = require('express')
const path = require('path');
const fs = require('fs');
const router = express.Router();
const app = express()
const Directorio = require('./clases/directorio');

// Variables
const rutaRaiz = 'C:/Users/Klau/AppData/Local/Programs/Microsoft VS Code/'
const estructura = []
const directorios = []

try {
    inicializar(rutaRaiz)
} catch (e) {
    console.log(e)
}

// Config
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

// Funciones 
function inicializar(ruta) {
    fs.readdirSync(ruta).forEach(dir => {
    let type = fs.lstatSync(ruta + dir)
        if(type.isDirectory()) {
            let dirObj = new Directorio(dir, (ruta + dir + '/'))
            dirObj.setArchivos(dirObj.getFiles())
            dirObj.setSubDirectorios(dirObj.getInnerDir())
            directorios.push(dirObj.getSubDirectiorios())
            estructura.push(dirObj)
        }
    })
    estructura.forEach(dir => {
        app.get('/' + dir.getNombre(), (req, res) => {
            res.render('index.ejs', {estructura: estructura})
        })
    })
    directorios.forEach( dir => {
        if (dir) {
            console.log(dir)
        }
    })
}

// HTTP METHODs
app.get('/', (req, res) => {
    res.redirect('/' + estructura[0].getNombre())
});

app.get('/estructura', (req, res) => {
    res.send(estructura)
});

app.listen(3000)