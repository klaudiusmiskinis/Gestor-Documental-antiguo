// SETUP //
require('dotenv').config(); 
const fileupload     = require('express-fileupload');
const methodOverride = require('method-override');
const cookieSession  = require('cookie-session')
const express        = require('express');
const bcrypt         = require('bcrypt');
const app            = express();

// MIDDLEWARES //
const recursivo      = require('./middleware/recursivo');
const descargar      = require('./middleware/descargar');
const eliminar       = require('./middleware/eliminar');
const subir          = require('./middleware/subir');
const mysql          = require('./middleware/mysql')
const { checkRol }   = require('./middleware/rol');

// VARIABLES //
const rutaRaiz       = process.env.RUTA_LOCAL;
let allDirectories   = [];
let allFiles         = [];
let dirFilter        = [];
let nomRutas         = [];


// CONFIGURACIÓN DE FUNCIONAMIENTO //
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(fileupload());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET_SESSION],
    maxAge: 1 * 60 * 60 * 1000
}));
/* RUTAS ESTATICAS PARA ARCHIVOS DE ESTILO, SCRIPTS Y NODE_MODULES */
app.use('/assets', express.static('views/assets'));
app.use('/script', express.static('views/script'));
app.use('/tippy.css', express.static('node_modules/tippy.js/dist/tippy.css'));
app.use('/jquery.js', express.static('node_modules/jquery/dist/jquery.min.js'));
app.use('/bootstrap.icons', express.static('node_modules/bootstrap-icons/font/'));
app.use('/tippy.js', express.static('node_modules/tippy.js/dist/tippy.umd.min.js'));
app.use('/jquery.min.map', express.static('node_modules/jquery/dist/jquery.min.map'));
app.use('/popper.js', express.static('node_modules/@popperjs/core/dist/umd/popper.min.js'));
app.use('/bootstrap.js', express.static('node_modules/bootstrap/dist/js/bootstrap.min.js'));
app.use('/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/tippy.umd.min.js.map', express.static('node_modules/tippy.js/dist/tippy.umd.min.js.map'));
app.use('/popper.min.js.map', express.static('node_modules/@popperjs/core/dist/umd/popper.min.js.map'));
app.use('/bootstrap.min.js.map', express.static('node_modules/bootstrap/dist/js/bootstrap.min.js.map'));
app.use('/bootstrap.min.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css.map'));

// DESPLIEGUE //
actualizar();

// METODOS HTTPs //
// GETs //
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', async (req, res) => {
    actualizar();
    let modo = checkRol(req);
    res.cookie('position', '/');
    res.render('index.ejs', {directorios: recursivo.directorio('/', allFiles, dirFilter), rutas: nomRutas, rol: modo});
});

app.get('/subdepartamento', async(req, res) => {
    if (req.session.user === process.env.ROL_HIGH) {
        res.send(await mysql.findUserBySubdepartamento(process.env.SUBDEPARTAMENTO));
    } else {
        res.send(['Sin permiso']);
    }
})

app.get('/archivos', async(req, res) => {
    if (req.session.user === process.env.ROL_HIGH) {
        res.send(await mysql.findArchivos());
    } else {
        res.send(['Sin permiso']);
    }
}) 

// POSTs //
/* LOGIN */
app.post('/login', async (req, res) => {
    if (req.body.nombre == process.env.USER_LOGIN && await bcrypt.compareSync(req.body.password, process.env.PASSWORD_LOGIN)) {
        req.session.user = process.env.ROL_HIGH;
    }
    res.redirect(req.get('referer'));
});

/* LOGOUT */
app.post('/logout', async (req, res) => {
    req.session = null;
    res.redirect(req.get('referer'));
});

/* SUBIR */
app.post('/subir', async (req, res) => {
    subir.run(rutaRaiz, req, res);
    console.log(req.body);
    res.redirect(req.get('referer'));
});

/* DESCARGAR */
app.post('/descargar', async (req, res) => {
    descargar.run(rutaRaiz, req, res);
    res.download(rutaArchivo);
});

// DELETEs //
/* ELIMINAR */
app.delete('/eliminar', async (req, res) => {
    eliminar.run(rutaRaiz, req, res);
    console.log(req.body)
    res.redirect(req.get('referer'));
});

// PUERTO DE DESPLIGUE //
app.listen(process.env.PORT_APP);

// FUNCIONES //
/* ACTUALIZAR */
/* PARAMETROS: NO */
/* RETURN: NADA */
/* SE ENCARGA DE HACER LA RECURSIVIDAD DE LOS DIRECTORIOS Y GENERAR LOS CONTENIDOS DE LAS VARIABLES */
/* UNA VEZ CONTIENE LOS DATOS, CREA METODOS HTTP GET CON LAS RUTAS DE DIRECTORIOS PARA CONECTARNOS */
function actualizar() {
    let directorios = recursivo.recursivo(rutaRaiz);
    allDirectories = directorios[0];
    allFiles = directorios[1];
    dirFilter = directorios[2];
    nomRutas = directorios[3];
    nomRutas.forEach(nom => {
        transformado = encodeURI(nom);
        if (nom.charAt(0) != '/') {
            transformado = '/' + transformado;
        }
        app.get(transformado, async (req, res) => {
            let modo = checkRol(req)
            actualizar();
            let directorios = recursivo.directorio(nom, allFiles, dirFilter);
            res.cookie('position', nom);
            res.render('index.ejs', {directorios: directorios, rutas: nomRutas, rol: modo});
        });
    });
};


