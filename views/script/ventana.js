document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        $(document.body).hide('fast');
    }
};

window.onload = function(e) {
    $(document.body).fadeIn('slow');
};

if(document.getElementById('volver')) {
    if (document.title == 'Home') {
        document.getElementById('volver').className += ' hide';
        document.getElementById('volver').onclick = function() {
            volver();
        };
    } else {
        document.getElementById('volver').onclick = function() {
            volver();
        };
    };
};

if(document.getElementById('regresar')) {
    document.getElementById('regresar').onclick = function() {
        volver();
    };
};

//FUNCTION
function volver() {
    console.log(window.location.href)
    let cookie = (document.cookie).split('=')[1]
    cookie = decodeURI(cookie);
    cookie = cookie.split('%2F').join('/')
    if (cookie.includes('/')) {
        cookie = cookie.split('/');
        cookie.splice(-1);
        cookie = cookie.join('/');
        cookie = encodeURI(cookie)
        cookie = '/' + cookie
        window.location.replace(cookie)
    } else {
        window.location.replace('/')
    }
};

