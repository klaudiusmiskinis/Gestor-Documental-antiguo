require('dotenv').config(); 
const recursivo = require('./middleware/recursivo.js');
const fileupload = require('express-fileupload');
const methodOverride = require('method-override');
const express = require('express');
const fs = require('fs');
const app = express();

// Variables
const rutaRaiz = process.env.RUTA_LOCAL;
let allDirectories = [];
let allFiles = [];
let dirFilter = [];
let nomRutas = [];

actualizar();

function actualizar() {
    let data = recursivo.recursivo(rutaRaiz);
    allDirectories = data[0];
    allFiles = data[1];
    dirFilter = data[2];
    nomRutas = data[3];
}


nomRutas.forEach(nom => {
    transformado = encodeURI(nom)
    if(nom.charAt(0) == '/') {
        app.get(transformado, (req, res) => {
            actualizar();
            let data = recursivo.getFolder(nom, allFiles, dirFilter)
            res.cookie('position', nom);
            res.render('index.ejs', {data: data});
        })
    } else {
        app.get('/' + transformado, (req, res) =>{
            actualizar();
            let data = recursivo.getFolder(nom, allFiles, dirFilter)
            res.cookie('position', nom);
            res.render('index.ejs', {data: data});
        })
    }
})

// CONFIG
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
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
    res.cookie('position', '/');
    res.render('index.ejs', {data: recursivo.getFolder('/', allFiles, dirFilter)})
})

// POST
app.post('/subir', async (req, res) => {
    let rutaArchivo = '';
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];

    if (req.files) {
        if(decode == '%2F') {
            rutaArchivo = rutaRaiz + req.files.file_data.name;
        } else {
            decode = decode.split('%2F').join('/');
            rutaArchivo = rutaRaiz + decode + '/' + req.files.file_data.name;
        }
        try {
            if(!fs.existsSync(rutaArchivo)) {
                await req.files.file_data.mv(rutaArchivo);
                } else {
                    if(req.query) {
                    let renombrar;
                    if (req.query.nuevaversion == 'true') {
                        let version = req.query.version;
                        let nombre = (req.files.file_data.name).split('.');
                        let cambiar = nombre[0].slice(nombre[0].length-2);
                        renombrar = nombre[0] + '_' + version  + '.' + nombre[1];
                        if (cambiar.includes('_')) {
                            renombrar = renombrar.split(cambiar).join('')
                        }
                        if(decode == '%2F') {
                            rutaArchivo = rutaRaiz + renombrar;
                        } else {
                            decode = decode.split('%2F').join('/');
                            rutaArchivo = rutaRaiz + decode + '/' + renombrar;
                        }
                        await req.files.file_data.mv(rutaArchivo);
                    } else {
                        await req.files.file_data.mv(rutaArchivo);
                    }
                }
                console.log('Guardar', renombrar)
            }
        } catch(e) {}
    }
    res.redirect(req.get('referer'));
});

app.post('/descargar', async (req, res) => {
    let decode = decodeURI(req.headers.cookie);
    decode = decode.split('=')[1];
    if(decode == '%2F') {
        rutaArchivo = rutaRaiz + req.body.descargar;
    } else {
        let archivo = (req.body.descargar).split('%2F').join('/');
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + archivo;
    }
    console.log('Descargando:', req.body.descargar);
    res.download(rutaArchivo);
});

app.post('/accion', async (req, res) => {
    console.log(req.body);
    res.end();
});

// DELETE
app.delete('/eliminar', async(req, res) => {
    let rutaArchivo = '';
    let decode = decodeURI(req.headers.cookie)
    decode = decode.split('=')[1];

    if(decode == '%2F') {
        rutaArchivo = rutaRaiz + req.body.archivo;
    } else {
        decode = decode.split('%2F').join('/');
        rutaArchivo = rutaRaiz + decode + '/' + req.body.archivo;
    }

    try {
        await fs.unlinkSync(rutaArchivo);
    } catch(err) {
       console.error(err);
    }
    console.log('Eliminando:', req.body.archivo);
    res.redirect(req.get('referer'));
})

app.listen(process.env.PORT_APP);