$('#buscadorFile').on('input', () => {
    $('.archivo').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorFile').val()).toLowerCase()))) {
            let padre = $(this).parents()[3];
            padre.style.setProperty('display', 'block');
        } else {
            let padre = $(this).parents()[3];
            padre.style.setProperty('display', 'none');
        }
    });
})

$('#buscadorDir').on('input', () => {
    $('.directorio').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorDir').val()).toLowerCase()))) {
            let padre = $(this).parents()[2];
            padre.style.setProperty('display', 'block');
        } else {
            let padre = $(this).parents()[2];
            padre.style.setProperty('display', 'none');
        }
    });
})

$('#buscadorRutas').on('input', () => {
    $('.rutas').each(function() {
        if (($(this).html().trim()).toLowerCase().includes((($('#buscadorRutas').val()).toLowerCase()))) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
});