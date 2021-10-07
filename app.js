const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const { sep } = require('path');
const { render } = require('ejs');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser')
const express = require('express')
var wrench = require("wrench");
const app = express()
const fs = require('fs');

// Variables
const rutaRaiz = '//serverdoc/e/X_Dpt_RRHH i Qualitat/SGC y seguridad alimentaria/Sistema documental/'
let allDirectories = []
let allFiles = []
let dirFilter = []
let nomRutas = []

actualizar()

// Funciones
function getFolder(nom) {
    let data = {
        nom: nom,
        hijos: [],
        archivos: [],
        css: __dirname
    }

    dirFilter.find(dir => {
        if(dir.rutaRelativa == nom) {  //PARA LOS SUBDIR DE LA RUTA PADRE. PADRE = '/'
            data.archivos = dir.archivos;
        } else if (dir.nombre == nom + '/'){
            data.archivos = dir.archivos;
        } else if(dir.nombre == nom){
            data.archivos = dir.archivos;
        }

        //Buscamos a los subdirectorios (hijos)
        if (dir.padre == nom){
            data.hijos.push(dir);
        } else if ((nom + '/' + dir.nombre) == dir.rutaRelativa) {
            data.hijos.push(dir);
        }
    })
    return data;
}

function rutas(dir){
    if(dir.padre == rutaRaiz) {
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
            padre: rutaRaiz,
            rutaRelativa: null,
            rutaAbsoluta: rutaRaiz,
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
        } else {
            transformado = nom
        }
        
        if(nom.charAt(0) == '/'){
            app.get(transformado, (req, res) => {
                actualizar();
                let data = getFolder(nom)
                res.cookie('position', nom);
                res.render('index.ejs', {data: data});
            })
        } else {
            app.get('/' + transformado, (req, res) =>{
                actualizar();
                let data = getFolder(nom)
                res.cookie('position', nom);
                res.render('index.ejs', {data: data});
            })
        }
    })
}

// CONFIG
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(fileupload());
app.use('/assets', express.static('views/assets'));
app.use('/script', express.static('views/script'));

// HTTPs
// GET
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    actualizar();
    res.cookie('position','/');
    res.render('index.ejs', {data: getFolder('/')})
})

// POST
app.post('/subir', async (req, res) => {
    if (req.files.archivoSubir) {
        var cookie = req.headers.cookie
        cookie = cookie.split('=')[1]
        let transformado = '';
        if(cookie == '%2F') {
            transformado = '/';
            cookie = '/'
        } else {
            transformado = cookie.split('%20').join('/')
        }
        let rutaArchivo = rutaRaiz + transformado + req.files.archivoSubir.name
        try {
            if(!fs.existsSync(rutaArchivo)){
                await req.files.archivoSubir.mv(rutaArchivo) 
            } else {
                console.log('Existe')
            }
        } catch(e){
            console.log(e)
        }
    }
    res.redirect(cookie)
});

app.listen(3000)
