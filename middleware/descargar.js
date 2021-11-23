function run(rutaRaiz, req, res) {
    let cookies = req.headers.cookie;
    cookies = cookies.split(' ')
    cookies.forEach(cookie => {
        if (cookie.includes('position')) {
            let position = cookie.split('=')[1];
            if(position == '%2F') {
                rutaArchivo = rutaRaiz + req.body.descargar;
            } else {
                let archivo = (req.body.descargar).split('%2F').join('/');
                position = position.split('%2F').join('/');
                position = position.split('%20').join(' ');
                rutaArchivo = rutaRaiz + position + '/' + archivo;
            }
            console.log('Descargando:', req.body.descargar);
        }
    })
};

module.exports = {
    run
};