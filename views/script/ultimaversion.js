
$('#ultimaVersion').on('click', function(e) {
    $(this).toggleClass('ultima')
    arrayArchivos = []

    $('.archivo').each(function(i) {
        arrayArchivos.push(new Archivo($(this).text(), $(this).parents()[3]))
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
        arrayArchivos.forEach(archivoI => {
            archivoI.mostrar();
        });
    }
});