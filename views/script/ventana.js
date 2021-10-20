window.onDOMContentLoaded = function(){
    if (document.title == 'Home') {
        // $(document.getElementById('container-water')).slideDown();
    };
    
    let elementos = document.getElementsByClassName('cerrar');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', eliminar, false);
        elementos[i].id = 'cerrar' + i;
        elementos[i].name = 'formEliminar' + i;
    };
    setTimeout(function() {
        if (document.title == 'Home') {
            // $(document.getElementById('container-water')).slideUp();
        }
    }, 1000);
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


