$('#subir-boton').on('click', function(e) {
    e.preventDefault();
    if (document.getElementById('subir-campo').files[0] != undefined) {
        let nombreArchivoSubir = document.getElementById('subir-campo').files[0].name;
        nombreArchivoSubir = new Archivo(nombreArchivoSubir).comprobarParentesis(nombreArchivoSubir)
        let datosFormulario = {
            existenciaRepetida: false,
        }
        arrayArchivos = []
        $('.archivo').each(function() {
            arrayArchivos.push(new Archivo($(this).text(), $(this).parents()[3]))
        });

        arrayArchivos.forEach(archivo => {
            if (archivo.comprobarExistencia(nombreArchivoSubir)) {
                datosFormulario.existenciaRepetida = true;
            }
        });

        arrayArchivos.forEach(archivo => {
            nombreArchivoSubir = archivo.generarDatosPorNombreDeArchivo(nombreArchivoSubir);
        });

        if (datosFormulario.existenciaRepetida) {
            let nombreArchivoSubirDatos;
            arrayArchivos.forEach(archivo => {
                nombreArchivoSubirDatos = archivo.generarDatosFormularioExistente(nombreArchivoSubir);
            });
            formularioExistenciaRepetidaValores(nombreArchivoSubirDatos, 'Nueva versión')
            $('#archivo-existente').modal('show'); 
        } else {
            let nuevoArchivo = new Archivo($('#subir-campo')[0].files[0].name);
            nuevoArchivo.setNombreCompleto(nuevoArchivo.comprobarParentesis(nuevoArchivo.getNombreCompleto()))
            formularioExistenciaRepetidaValores(nuevoArchivo.generarDatosFormularioExistente(nuevoArchivo.generarDatosPorNombreDeArchivoSinSuma(nuevoArchivo.getNombreCompleto())), 'Nuevo archivo');
            $('#crear-nueva-version-modal').modal('show'); 
        }
    }
})

$("#subir-campo").change(function() {
    $(this).after($(this).clone()).appendTo($('#archivoContenidoOculto'));
});

/* DESPLIEGA EL MODAL DE INFORMACION */
$('#info').on('click', function() {
    $('#informacion-archivos-subir').modal('show'); 
})

/* DESPLIEGA EL MODAL DE NUEVA VERSION */
$('#crear-nueva-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    $('#crear-nueva-version-modal').modal('show');
})

/* DESPLIEGA EL MODAL DE NUEVA VERSION */
$('#sobreescribir-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    let nuevoArchivo = new Archivo($('#subir-campo')[0].files[0].name);
    nuevoArchivo.setNombreCompleto(nuevoArchivo.comprobarParentesis(nuevoArchivo.getNombreCompleto()))
    formularioExistenciaRepetidaValores(nuevoArchivo.generarDatosFormularioExistente(nuevoArchivo.generarDatosPorNombreDeArchivoSinSuma(nuevoArchivo.getNombreCompleto())), 'Sobreescrito');
    $('#crear-nueva-version-modal').modal('show');
})

function formularioExistenciaRepetidaValores(nombreArchivoSubirDatos, tipo) {
    $('#version-nuevo-archivo').val('Versión: ' + nombreArchivoSubirDatos[1]);
    $('#archivoContenidoOculto')[0].files = $('#subir-campo')[0].files
    $('#nombre-archivo').val(nombreArchivoSubirDatos[0]);
    $('#archivoOculto').val(nombreArchivoSubirDatos[0])
    $('#versionOculto').val(nombreArchivoSubirDatos[1])
    $('#tipoMotivo').val(tipo);
    $("#subir-campo").change(function() {
           $(this).after($(this).clone()).appendTo($('#archivoContenidoOculto'));
     });
}