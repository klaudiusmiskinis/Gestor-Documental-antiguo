$('#buscador').on('input', () => {
    $('.archivo').each(function() {
        if ($(this).html().includes($('#buscador').val())) {
            let id = '#' + $(this).html();
            console.log(document.querySelector(id).id);
            $($(this).html()).hide();
        } else {
            $(this).show()
        }
    });
})