
$(document).ready(function() {
    ultimaVersion($('#ultimaVersion').attr('id'))
})

$('#ultimaVersion').on('click', function() {
    ultimaVersion($(this).attr('id'));
});

function ultimaVersion(id){
    id = '#' + id;
    arrayArchivos = []

    $(id).toggleClass('ultima');
    $('.archivo').each(function() {
        arrayArchivos.push(new Archivo($(this).text(), $(this).parents()[4]))
    });

    if ($(id).hasClass('ultima')) {
        let hijo = $(id).children()[0];
        hijo.src = '/assets/img-svg/eyecross.svg'
        arrayArchivos.forEach(archivoI => {
            arrayArchivos.forEach(archivoJ => {
                archivoI.compararArchivosRepetidos(archivoJ);
            });
        });
        arrayArchivos.forEach(archivoI => {
            if (!archivoI.getMayor()) {
                archivoI.esconder();
            }
        })
    } else {
        let hijo = $(id).children()[0];
        hijo.src = '/assets/img-svg/eye.svg'
        arrayArchivos.forEach(archivoI => {
            archivoI.mostrar();
        });
    }
}