module.exports = {
    checkRol: (req) => {
        let rol;
        if (!req.session.user){
            req.session.user = process.env.ROL_LOW;
            rol = 'lectura';
        } else if (req.session.user === process.env.ROL_LOW){
            rol = 'lectura';
        } else if (req.session.user === process.env.ROL_HIGH) {
            rol = 'escritura';
        }
        return rol;
    }
}