$('#buscadorFile').on('input', () => {
    $('.archivo').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorFile').val()).toLowerCase()))) {
            let padre = $(this).parents()[3]
            $('#' + padre.id).fadeIn();
        } else {
            let padre = $(this).parents()[3]
            $('#' + padre.id).fadeOut();
        }
    });
})

$('#buscadorDir').on('input', () => {
    $('.directorio').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorDir').val()).toLowerCase()))) {
            let padre = $(this).parents()[2]
            $('#' + padre.id).fadeIn();
            
        } else {
            let padre = $(this).parents()[2]
            $('#' + padre.id).fadeOut();
        }
    });
})

$('#buscadorRutas').on('input', () => {
    $('.rutas').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorRutas').val()).toLowerCase()))) {
            $(this).fadeIn();
        } else {
            $(this).fadeOut();
        }
    })
});
