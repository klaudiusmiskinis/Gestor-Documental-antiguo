let elementos = document.querySelectorAll('.img-archivo')
for (let i = 0; i < elementos.length; i++) {
    imageExiste(elementos[i]);
}

function imageExiste(elemento){
    let ruta = elemento.currentSrc;
    $.get(ruta)
    .fail(function() { 
        elemento.src = '/assets/img-svg/file.svg';
    })
}