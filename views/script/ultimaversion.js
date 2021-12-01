
$('#ultimaVersion').on('click', function(e) {
    $(this).toggleClass('ultima');
    let hijo = $(this).children()[0];
    hijo.src = 'assets/img-svg/eyecross.svg'
    arrayArchivos = []

    $('.archivo').each(function(i) {
        arrayArchivos.push(new Archivo($(this).text(), $(this).parents()[4]))
    });

    if ($(this).hasClass('ultima')) {
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
        let hijo = $(this).children()[0];
        hijo.src = 'assets/img-svg/eye.svg'
        arrayArchivos.forEach(archivoI => {
            archivoI.mostrar();
        });
    }
});