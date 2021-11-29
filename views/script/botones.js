$('#subir-boton').on('click', function(e) {
    e.preventDefault();
    if (document.getElementById('subir-campo').files[0] != undefined) {
        let nombreArchivoSubir = document.getElementById('subir-campo').files[0].name;
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
            formularioExistenciaRepetidaValores(nombreArchivoSubirDatos)
            $('#archivo-existente').modal('show'); 
        } else {
            
        }
    }
})

/* DESPLIEGA EL MODAL DE INFORMACION */
$('#info').on('click', function() {
    $('#informacion-archivos-subir').modal('show'); 
})

$('#crear-nueva-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    $('#crear-nueva-version-modal').modal('show');
})

$('#sobreescribir-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    $('#sobreescribir-version-modal').modal('show');
})

function formularioExistenciaRepetidaValores(nombreArchivoSubirDatos) {
    $('#version-nuevo-archivo').val('Versión: ' + nombreArchivoSubirDatos[1]);
    $('#archivoContenidoOculto')[0].files = $('#subir-campo')[0].files
    $('#nombre-archivo').val(nombreArchivoSubirDatos[0]);
    $('#archivoOculto').val(nombreArchivoSubirDatos[0])
    $('#versionOculto').val(nombreArchivoSubirDatos[1])
    $('#tipoMotivo').val('Nueva versión');
    $("#subir-campo").change(function() {
        var $this = $(this),
           $clone = $this.clone();
        $this.after($clone).appendTo($('#archivoContenidoOculto'));
     });
}
