const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const path = require('path');
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');
const Directorio = require('./clases/directorio');

// Variables
const rutaRaiz = 'C:/xampp/htdocs/'
const allDirectories = []
const allFiles = []
var files = wrench.readdirSyncRecursive(rutaRaiz);
    wrench.readdirRecursive(rutaRaiz, function (error, files) {});

files.forEach(file => {
    if(fs.lstatSync(rutaRaiz + file).isDirectory()) {
        allDirectories.push(file)
    } else  if(fs.lstatSync(rutaRaiz + file).isFile()){
        allFiles.push(file)
    } else {
        console.log('Ni archivo ni directorio :O')
    }
})


// Config
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

//HTTPs
app.get('/', (req, res) => {
    console.log(files)
})

app.listen(3000)
