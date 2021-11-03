// SETUP //
require('dotenv').config(); 
const fileupload = require('express-fileupload');
const methodOverride = require('method-override');
const express = require('express');
const app = express();

// MIDDLEWARES //
const recursivo = require('./middleware/recursivo');
const eliminar = require('./middleware/eliminar');
const descargar = require('./middleware/descargar');
const accion = require('./middleware/accion');
const subir = require('./middleware/subir');

// VARIABLES //
const rutaRaiz = process.env.RUTA_LOCAL;
let allDirectories = [];
let allFiles = [];
let dirFilter = [];
let nomRutas = [];

// DESPLIEGUE //
actualizar();

// CONFIGURACIÓN DE FUNCIONAMIENTO //
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(fileupload());
app.use('/assets', express.static('views/assets'));
app.use('/script', express.static('views/script'));
app.use('/node', express.static('node_modules'));

// METODOS HTTPs //
// GETs //
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    actualizar();
    res.cookie('position', '/');
    res.render('index.ejs', {data: recursivo.directorio('/', allFiles, dirFilter)});
});

// POSTs //
/* SUBIR */
app.post('/subir', async (req, res) => {
    subir.run(rutaRaiz, req, res);
    res.redirect(req.get('referer'));
});

/* DESCARGAR */
app.post('/descargar', async (req, res) => {
    descargar.run(rutaRaiz, req, res);
    res.download(rutaArchivo);
});

/* ACCION */
app.post('/accion', async (req, res) => {
    console.log(req.body);
    res.end();
});

// DELETEs //
app.delete('/eliminar', async (req, res) => {
    eliminar.run(rutaRaiz, req, res);
    res.redirect(req.get('referer'));
});

// PUERTO DE DESPLIGUE //
app.listen(process.env.PORT_APP);

// FUNCIONES //
function actualizar() {
    let data = recursivo.recursivo(rutaRaiz);
    allDirectories = data[0];
    allFiles = data[1];
    dirFilter = data[2];
    nomRutas = data[3];
    nomRutas.forEach(nom => {
        transformado = encodeURI(nom);
        if(nom.charAt(0) == '/') {
            app.get(transformado, (req, res) => {
                actualizar();
                let data = recursivo.directorio(nom, allFiles, dirFilter);
                res.cookie('position', nom);
                res.render('index.ejs', {data: data});
            });
        } else {
            app.get('/' + transformado, (req, res) =>{
                actualizar();
                let data = recursivo.directorio(nom, allFiles, dirFilter);
                res.cookie('position', nom);
                res.render('index.ejs', {data: data});
            });
        };
    });
};