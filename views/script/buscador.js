$('#buscadorFile').on('input', () => {
    $('.archivo').each(function() {
        if ($(this).html().includes($('#buscadorFile').val())) {
            let padre = $(this).parents()[3];
            padre.style.setProperty('display', 'block');
        } else {
            let padre = $(this).parents()[3];
            padre.style.setProperty('display', 'none');
        }
    });
})

$('#buscadorDir').on('input', () => {
    $('.directorios').each(function() {
        if ($(this).html().trim().includes($('#buscadorDir').val())) {
            let padre = $(this).parents()[2];
            padre.style.setProperty('display', 'block');
        } else {
            let padre = $(this).parents()[2];
            padre.style.setProperty('display', 'none');
        }
    });
})