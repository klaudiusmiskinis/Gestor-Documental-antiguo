function selectPersonasDepartamento(id) {
    if ($('#' + id).has('option').length == 0) {
        $.get( "/subdepartamento", function(data) {
            $.each(data, function (i, user) {
                $('#' + id).append($('<option>', {
                    value: user.dni,
                    text : (user.dni.substring(0,3) + '***' + user.dni.substring(6, 9) + ', ' + user.nombre)
                }));
            });
        });
    }
}