document.onreadystatechange = function(e) {
    if (window.location.pathname == '/'){
        window.location.replace('/home');
    }
    if (document.readyState === 'complete') {
        $(document.body).hide('fast');
        let color = getComputedStyle(document.documentElement).getPropertyValue('--col');
        $('#colorPicker').val(toRGB(color));
    }
};

$('#colorPicker').on('input', function(){
    document.documentElement.style.setProperty('--col', $(this).val());
    document.documentElement.style.setProperty('--col-transparent', $(this).val() + '7e');
})

window.onload = function(e) {
    $(document.body).fadeIn('slow', function() {
        let color = getComputedStyle(document.documentElement).getPropertyValue('--col');
    });

    if (document.getElementById('dir-titulo')) {
        animacionNum('dir-titulo', 0, document.getElementById('dir-numero').value, 900);
    }

    if (document.getElementById('archivos-titulo')) {
        animacionNum('archivos-titulo', 0, document.getElementById('archivos-numero').value, 900);
    }
};

if (document.getElementById('volver')) {
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

if (document.getElementById('regresar')) {
    document.getElementById('regresar').onclick = function() {
        volver();
    };
};

function volver() {
    let cookie = getCookie('position')
    cookie = decodeURI(cookie);
    cookie = cookie.split('%2F').join('/')
    if (cookie.includes('/')) {
        cookie = cookie.split('/');
        cookie.splice(-1);
        cookie = cookie.join('/');
        cookie = '/' + cookie
        window.location.replace(cookie)
    } else {
        window.location.replace('/')
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function animacionNum(id, primero, ultimo, duracion) {
    if (primero === ultimo) return;
    let rango = ultimo - primero;
    let current = primero;
    let increment = ultimo > primero? 1 : -1;
    let stepTime = Math.abs(Math.floor(duracion / rango));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == ultimo) {
            clearInterval(timer);
        }
    }, stepTime);
}

function toRGB(hex) {
    hex = hex.split('#')[1]
    var aRgbHex = hex.match(/.{1,2}/g);
    aRgbHex = '#' + aRgbHex[0] + aRgbHex[1] + aRgbHex[2]
    return aRgbHex;
  }
