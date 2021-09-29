const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');
const { sep } = require('path');

// Variables
const rutaRaiz = '//serverdoc/e/X_Dpt_RRHH i Qualitat/SGC y seguridad alimentaria/Sistema documental/'
const allDirectories = []
const allFiles = []

// Funciones
var files = wrench.readdirSyncRecursive(rutaRaiz);
wrench.readdirRecursive(rutaRaiz, function (error, files) {});

// GET directorios y archivos recursivos con replace de \ a /
files.forEach(file => {
    file = file.replace(/\\/g, '/');
    if(fs.lstatSync(rutaRaiz + file).isDirectory()) {
        allDirectories.push(file)
    } else  if(fs.lstatSync(rutaRaiz + file).isFile()){
        allFiles.push(file)
    }
})

let directorio;
let dirFilter = []

//LOOP ALLDIR
function actualizar() {
    dirFilter.push(
        dirObj = {
            nombre: '/',
            padre: rutaRaiz,
            rutaRelativa: rutaRaiz,
            rutaAbsoluta: rutaRaiz,
            archivos: []
        }
    )
    
    allDirectories.forEach(dir => {
        let separador = dir.split('/')
        directorio = getPadre(separador)
        function getPadre(sep) {
            if (sep.length > 1) {
                let dirObj = {
                    nombre: sep[sep.length -1],
                    padre: sep[sep.length -2] + '/',
                    rutaRelativa: dir + '/',
                    rutaAbsoluta: rutaRaiz + dir + '/',
                    archivos: []
                }
                return dirObj;  
            } else {
                let dirObj = {
                    nombre: sep[sep.length -1],
                    padre: '/',
                    rutaRelativa: '/',
                    rutaAbsoluta: rutaRaiz,
                    archivos: []
                } 
                return dirObj; 
            }
        }    
        dirFilter.push(directorio)
    })
    
    //LOOP ALLFILES
    allFiles.forEach(file => {
        let separador = file.split('/')
        dirFilter.find(dir => {
            if (dir.nombre == separador[separador.length-2] && dir.padre == ((separador[separador.length-3]) + '/'))  {
                dir.archivos.push(separador[separador.length-1])
            } else if (dir.nombre == separador){
                dir.archivos.push(separador)
            }
        })
    })

    dirFilter.forEach(dir => {
        if (dir.nombre == '/') {
            app.get('/home', (req, res) => {
                res.render('index.ejs', {dir: dir})
            })
        } else {
            app.get(dir.padre + '/' + dir.nombre, (req, res) => {
                res.render('index.ejs')
            })
        }
    })
    console.log(app._router.stack)
}

// CONFIG
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

//HTTPs
app.get('/', (req, res) => {
    actualizar();
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('index.ejs', {dir: dir})
})

app.listen(3000)
