tippy('.desplegable', {
    content: "Desplegable",
    animation: 'fade',
});


tippy('#container-subir-campo', {
    content: "Haz click para subir un archivo",
    placement: 'bottom',
    animation: 'fade',
});

$(document).ready(function() {
    let rutas = document.querySelectorAll('.rutas');
    rutas.forEach(ruta => {
        tippy(ruta, {
            content: ruta.title,
            placement: 'right',
            animation: 'fade',
        })
    })
    
})


