// SETUP
require('dotenv').config(); 
const fileupload = require('express-fileupload');
const methodOverride = require('method-override');
const express = require('express');
const app = express();
// MIDDLEWARES
const recursivo = require('./middleware/recursivo');
const eliminar = require('./middleware/eliminar');
const descargar = require('./middleware/descargar');
const accion = require('./middleware/accion');
const subir = require('./middleware/subir');


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
    nomRutas.forEach(nom => {
        transformado = encodeURI(nom)
        if(nom.charAt(0) == '/') {
            app.get(transformado, (req, res) => {
                actualizar();
                let data = recursivo.directorio(nom, allFiles, dirFilter)
                res.cookie('position', nom);
                res.render('index.ejs', {data: data});
            })
        } else {
            app.get('/' + transformado, (req, res) =>{
                actualizar();
                let data = recursivo.directorio(nom, allFiles, dirFilter)
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

// HTTPs
// GET
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    actualizar('asd');
    res.cookie('position', '/');
    res.render('index.ejs', {data: recursivo.directorio('/', allFiles, dirFilter)})
})

// POST
app.post('/subir', async (req, res) => {
    subir.run(rutaRaiz, req, res);
    res.redirect(req.get('referer'));
});

app.post('/descargar', async (req, res) => {
    descargar.run(rutaRaiz, req, res);
    res.download(rutaArchivo);
});

app.post('/accion', async (req, res) => {
    console.log(req.body);
    res.end();
});

// DELETE
app.delete('/eliminar', async (req, res) => {
    eliminar.run(rutaRaiz, req, res);
    res.redirect(req.get('referer'));
})

app.listen(process.env.PORT_APP);
