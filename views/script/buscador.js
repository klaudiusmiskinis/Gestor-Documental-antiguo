$('#buscador-file').on('input', () => {
    $('.archivo').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscador-file').val()).toLowerCase()))) {
            let padre = $(this).parents()[4]
            $('#' + padre.id).fadeIn('fast');
        } else {
            let padre = $(this).parents()[4]
            $('#' + padre.id).fadeOut('fast');
        }
    });
})

$('#buscador-dir').on('input', () => {
    $('.directorio').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscador-dir').val()).toLowerCase()))) {
            let padre = $(this).parents()[3];
            try {
            $('#' + padre.id).fadeIn('fast')
            } catch {}
        } else {
            try {
                let padre = $(this).parents()[3];
                $('#' + padre.id).fadeOut('fast');
            } catch {}
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
