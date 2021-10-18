require('dotenv').config(); 
const { throws } = require('assert');
const { dir } = require('console');
const { get } = require('http');
const { arch, type } = require('os');
const { sep } = require('path');
const { render } = require('ejs');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const _ = require('underscore')
const express = require('express')
const wrench = require("wrench");
const app = express()
const fs = require('fs');

// Variables
const rutaRaiz = process.env.RUTA_LOCAL
let allDirectories = []
let allFiles = []
let dirFilter = []
let nomRutas = []

actualizar()

// Funciones
function getFolder(nom){
    let data = {
        nom: nom,
        hijos: [],
        archivos: [],
        extensiones: []
    }

    dirFilter.find(dir => {
        if (dir.padre == nom){
            data.hijos.push(dir);
        } else if ((nom + '/' + dir.nombre) == dir.rutaRelativa){
            data.hijos.push(dir);
        }

        if (dir.nombre == '/'){
            data.archivos = dir.archivos;
        } else if(dir.rutaRelativa == nom){ 
            data.archivos = dir.archivos;
            data.archivos = _.without(data.archivos, 'Thumbs.db')
        } 
    })

    data.archivos.forEach(archivo => {
        let extension = archivo.split('.')[1]
        data.extensiones.push(extension)
    })
    return data;
}

function rutas(dir){
    if(dir.padre == rutaRaiz){
        return dir.nombre
    } else {
        return dir.rutaRelativa
    }
}

function actualizar(){
    allDirectories = []
    allFiles = []
    dirFilter = []
    nomRutas = []

    var files = wrench.readdirSyncRecursive(rutaRaiz);
    wrench.readdirRecursive(rutaRaiz, function (error, files){});

    files.forEach(file => {
        file = file.replace(/\\/g, '/');
        if(fs.lstatSync(rutaRaiz + file).isDirectory()){
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
        function getPadre(sep){
            if (sep.length > 1){
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
            } else if(separador.length == 2 && dir.nombre == separador[0] && dir.padre == '/'){
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
        transformado = encodeURI(nom)
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
app.use(methodOverride('_method'));
app.use(fileupload());
app.use('/assets', express.static('views/assets'));
app.use('/script', express.static('views/script'));
app.use('/bootstrap-plugin', express.static('node_modules/bootstrap-fileinput'));

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
    let rutaArchivo = '.';
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];
    let redirect = '';

    if (req.files){

        if(decode == '%2F'){
            rutaArchivo = rutaRaiz + req.files.file_data.name;
            redirect = '/';
        } else {
            decode = decode.split('%2F').join('/');
            rutaArchivo = rutaRaiz + decode + '/' + req.files.file_data.name;
            redirect = decode;
        }

        try {
            if(!fs.existsSync(rutaArchivo)){
                await req.files.file_data.mv(rutaArchivo);
                res.redirect(redirect);
            } else {
                console.log('Existe');
            }
        } catch(e){
        }
    }
    
});

app.post('/descargar', async (req, res) => {
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];
    if(decode == '%2F'){
        rutaArchivo = rutaRaiz + req.body.descargar;
    } else {
        let archivo = (req.body.descargar).split('%2F').join('/');
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + archivo;
    }
    console.log('Descargando:', req.body.descargar);
    res.download(rutaArchivo);
});


// DELETE
app.delete('/eliminar', async(req, res) => {
    let rutaArchivo = '';
    let redirect = '';
    let decode = decodeURI(req.headers.cookie)
    decode = decode.split('=')[1];

    if(decode == '%2F'){
        rutaArchivo = rutaRaiz + req.body.archivo;
        redirect = '/';
    } else {
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + req.body.archivo;
        redirect = (req.headers.cookie).split('=')[1];
        redirect = decodeURI(redirect)
        redirect = redirect.split('%2F').join('/');
    }

    try {
        await fs.unlinkSync(rutaArchivo);
    } catch(err){
       console.error(err);
    }
    console.log('Eliminando:', req.body.archivo);
    res.redirect(redirect);
})

app.listen(3000);
