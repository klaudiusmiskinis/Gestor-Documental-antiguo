function listarCookies (req) {
    var list = {},
    rc = req;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

module.exports = {
    listarCookies
}