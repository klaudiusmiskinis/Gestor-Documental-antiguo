let elementos = document.querySelectorAll('.img-archivo')
for (let i = 0; i < elementos.length; i++) {
    imageExiste(elementos[i]);
}

function imageExiste(elemento){
    $.get(elemento.currentSrc)
    .fail(function() { 
        elemento.src = '/assets/img-svg/file.svg';
    })
}