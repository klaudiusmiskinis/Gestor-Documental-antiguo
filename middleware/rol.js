function checkRol(req) {
    let rol;
    if (!req.session.user){
        req.session.user = 'none';
        rol = 'lectura';
    } else if (req.session.user === 'none'){
        rol = 'lectura';
    } else if (req.session.user === 'admin') {
        rol = 'escritura';
    }
    return rol;
}

module.exports = {
    checkRol
}