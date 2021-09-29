const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');
const { sep } = require('path');
const { render } = require('ejs');

// Variables
const rutaRaiz = 'C:/Users/Klau/Desktop/Klau/'
const allDirectories = []
const allFiles = []
let dirFilter = []
let nomRutas = []

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

function rutas(dir){
    if(dir.padre == null) {
        return dir.nombre
    } else {
        return dir.rutaRelativa
    }
}

//LOOP ALLDIR
function actualizar() {
    dirFilter.push(
        dirObj = {
            nombre: '/',
            padre: null,
            rutaRelativa: null,
            rutaAbsoluta: null,
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
                    rutaAbsoluta: rutaRaiz,
                    archivos: []
                } 
                return dirObj; 
            }
        }    
        dirFilter.push(directorio)
    })

    dirFilter.forEach(dir => {
        nomRutas.push(rutas(dir))
    })
    
    //LOOP ALLFILES
    allFiles.forEach(file => {   
        let separador = file.split('/')
        dirFilter.find(dir => {
            if(separador.length == 1 && dir.nombre == '/'){
               dir.archivos.push(separador)
            }
            if (dir.nombre == separador[separador.length-2] && dir.padre == ((separador[separador.length-3]) + '/'))  {
                dir.archivos.push(separador[separador.length-1])
            } else if (dir.nombre == separador){
                dir.archivos.push(separador)
            }
        })
    })

    nomRutas.forEach(nom => {
        let replaced;
        if(nom.includes(' ')){
            replaced = nom.split(' ').join('%20')
        }
        console.log(nom)
        if(nom.charAt(0) == '/'){
            app.get(replaced, (req, res) => {
                

                res.send(nom)
            })
        } else {
            app.get('/' + nom, (req, res) =>{
                res.send(nom)
            })
        }
    })
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
    res.render('index.ejs', {dirFilter: dirFilter})
})

app.listen(3000)
