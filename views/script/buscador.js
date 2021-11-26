$('#buscador-file').on('input', () => {
    $('.archivo').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscador-file').val()).toLowerCase()))) {
            let padre = $(this).parents()[3]
            $('#' + padre.id).fadeIn('fast');
        } else {
            let padre = $(this).parents()[3]
            $('#' + padre.id).fadeOut('fast');
        }
    });
})

$('#buscador-dir').on('input', () => {
    $('.directorio').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscador-dir').val()).toLowerCase()))) {
            let padre = $(this).parents()[2]
            $('#' + padre.id).fadeIn('fast');
            
        } else {
            let padre = $(this).parents()[2]
            $('#' + padre.id).fadeOut('fast');
        }
    });
})

$('#buscadorRutas').on('input', () => {
    $('.rutas').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorRutas').val()).toLowerCase()))) {
            $(this).fadeIn('fast');
        } else {
            $(this).fadeOut('fast');
        }
    })
});
