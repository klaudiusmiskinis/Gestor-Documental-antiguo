const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const { sep } = require('path');
const { render } = require('ejs');
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');


// Variables
const rutaRaiz = '//Serverdoc/e/X_Dpt_RRHH i Qualitat/SGC y seguridad alimentaria/Sistema documental/'
let allDirectories = []
let allFiles = []
let dirFilter = []
let nomRutas = []

// Funciones

function getFolder(nom) {
    let data = {
        nom: nom,
        hijos: [],
        archivos: []
    }

    dirFilter.find(dir => {

        if (dir.rutaRelativa == nom) {
            console.log('A', dir)
        }

        if (dir.padre == nom){
            console.log('B', dir)
            data.hijos.push(dir); //PARA LA RUTA PADRE
        }

        if (dir.padre == nom + '/') {
            console.log('C', dir)
            data.hijos.push(dir);
        }

        if(dir.nombre == nom) {
            console.log('D', dir)
            data.archivos = dir.archivos;
        }

        if(dir.nombre == nom + '/'){
            console.log('E', dir)
            data.archivos = dir.archivos;
        }
    })

    return data;
}

function rutas(dir){
    if(dir.padre == null) {
        return dir.nombre
    } else {
        return dir.rutaRelativa
    }
}

function actualizar() {
    allDirectories = []
    allFiles = []
    dirFilter = []
    nomRutas = []

    var files = wrench.readdirSyncRecursive(rutaRaiz);
    wrench.readdirRecursive(rutaRaiz, function (error, files) {});

    files.forEach(file => {
        file = file.replace(/\\/g, '/');
        if(fs.lstatSync(rutaRaiz + file).isDirectory()) {
            allDirectories.push(file)
        } else if(fs.lstatSync(rutaRaiz + file).isFile()){
            allFiles.push(file)
        }
    })

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
                    rutaAbsoluta: rutaRaiz + dir,
                    archivos: []
                } 
                return dirObj; 
            }
        }    
        dirFilter.push(directorio)
    })

    // LOOP de nombre de rutas para el HTTP
    dirFilter.forEach(dir => {
        nomRutas.push(rutas(dir))
    })
    
    // LOOP para saber que archivo pertenece a que directorio
    allFiles.forEach(file => {   

        let separador = file.split('/')

        dirFilter.find(dir => {

            if(separador.length == 1 && dir.nombre == '/'){
                dir.archivos.push(separador[0])
            } else if(separador.length == 2 && dir.nombre == separador[0] && dir.padre == '/') {
                dir.archivos.push(separador[1])
            }

            if (dir.nombre == separador[separador.length-2] && dir.padre == ((separador[separador.length-3]) + '/'))  {
                dir.archivos.push(separador[separador.length-1])
            } else if (dir.nombre == separador){
                dir.archivos.push(separador)
            }

        })
    })

    let transformado = '';
    nomRutas.forEach(nom => {
        if(nom.includes(' ')){
            transformado = nom.split(' ').join('%20')
        }
        if(nom.charAt(0) == '/'){
            app.get(transformado, (req, res) => {
                let data = getFolder(nom)
                res.render('index.ejs', {data: data})
            })
        } else {
            app.get('/' + transformado, (req, res) =>{
                let data = getFolder(nom)
                res.render('index.ejs', {data: data})
            })
        }
    })
}

// CONFIG
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

// HTTPs
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    actualizar();
    res.render('index.ejs', {data: getFolder('/')})
})

app.listen(3000)
