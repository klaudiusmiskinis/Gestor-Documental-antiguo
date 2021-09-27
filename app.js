const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch } = require('os');
const path = require('path');
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');
const Directorio = require('./clases/directorio');

// Variables
const rutaRaiz = '//Serverdoc/e/z_Informatica/Z_Documentacio/'
var files = wrench.readdirSyncRecursive(rutaRaiz);
    wrench.readdirRecursive(rutaRaiz, function (error, files) {
});

// Config
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

//HTTPs
app.get('/', (req, res) => {
    console.log(files)
})

app.listen(3000)
