module.exports = {
    listarCookies: (req) => {
        let list = {},
        rc = req;
        rc && rc.split(';').forEach(function( cookie ) {
            let parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        return list;
    }
}