$('#buscador').on('input', () => {
    $('.archivo').each(function() {
        if ($(this).html().includes($('#buscador').val())) {
            let padre = $(this).parents()[3];
            padre.style.display = 'block';
        } else {
            let padre = $(this).parents()[3];
            padre.style.display = 'none';
        }
    });
})