console.log(document.cookie)

document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        $(document.body).hide('fast');
    }
};

window.onload = function(e) {
    $(document.body).fadeIn();
    let elementos = document.getElementsByClassName('cerrar');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', eliminar, false);
        elementos[i].id = 'cerrar' + i;
        elementos[i].name = 'formEliminar' + i;
    };
};

if(document.getElementById('volver')){
    document.getElementById('volver').onclick = function(){
        volver();
    };
};

if(document.getElementById('regresar')){
    document.getElementById('regresar').onclick = function(){
        volver();
    };
};

//FUNCTION
function volver(){
    window.history.back();
};

function eliminarArchivo(id){
    $('#' + id).submit();
};


