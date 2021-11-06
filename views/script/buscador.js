$('#buscador').on('input', () => {
    $('.archivo').each(function() {
        if ($(this).html().includes($('#buscador').val())) {
            $($(this).html()).hide();
        } else {
            $(this).show()
        }
    });
})