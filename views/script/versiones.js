$('#subir-boton').on('click', function(e) {
    e.preventDefault();

    if (document.getElementById('subir-campo').files[0] != undefined) {
        selectPersonasDepartamento('dni');
        let nombreArchivoSubir = document.getElementById('subir-campo').files[0].name;
        nombreArchivoSubir = new Archivo(nombreArchivoSubir).comprobarParentesis(nombreArchivoSubir)
        let datosFormulario = {
            existenciaRepetida: false,
        }
        arrayArchivos = []
        $('.archivo').each(function() {
            arrayArchivos.push(new Archivo($(this).text().trim(), $(this).parents()[4]))
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
            formularioExistenciaRepetidaValores(nombreArchivoSubirDatos, new Archivo(nombreArchivoSubir).getNombreSimple(), 'Formulario para una nueva versión');
            $('#archivo-existente').modal('show'); 
        } else {
            let nuevoArchivo = new Archivo($('#subir-campo')[0].files[0].name);
            nuevoArchivo.setNombreCompleto(nuevoArchivo.comprobarParentesis(nuevoArchivo.getNombreCompleto()));
            formularioExistenciaRepetidaValores(nuevoArchivo.generarDatosFormularioExistente(nuevoArchivo.generarDatosPorNombreDeArchivoSinSuma(nuevoArchivo.getNombreCompleto())), nuevoArchivo.getNombreSimple(), 'Formulario para una nueva versión');
            $('#version-modal').modal('show'); 
        }
    }
})

$("#subir-campo").change(function() {
    const files = this.files;
    const dt = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        $('#label-subir').html(file.name + ' [' + (file.size / 1024 ).toFixed(2) + 'KB]')
        dt.items.add(
            new File(
                [file.slice(0, file.size, file.type)],
                file.name
            )
        );
        document.getElementById('archivoContenidoOculto').files = dt.files;
    }
});

/* DESPLIEGA EL MODAL DE INFORMACION */
$('#info').on('click', function() {
    $('#informacion-archivos-subir').modal('show'); 
})

/* DESPLIEGA EL MODAL DE NUEVA VERSION */
$('#crear-nueva-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    $('#version-modal').modal('show');
})

/* DESPLIEGA EL MODAL DE NUEVA VERSION */
$('#sobreescribir-version').on('click', function() {
    $('#archivo-existente').modal('hide');
    let nuevoArchivo = new Archivo($('#subir-campo')[0].files[0].name);
    nuevoArchivo.setNombreCompleto(nuevoArchivo.comprobarParentesis(nuevoArchivo.getNombreCompleto()));
    formularioExistenciaRepetidaValores(nuevoArchivo.generarDatosFormularioExistente(nuevoArchivo.generarDatosPorNombreDeArchivoSinSuma(nuevoArchivo.getNombreCompleto())), nuevoArchivo.getNombreSimple(), 'Formulario para sobreescribir');
    $('#version-modal').modal('show');
})

$('.cerrar').on('click', function(e) {
    e.preventDefault();
    let archivoEliminar = $(this).children()[0];
    selectPersonasDepartamento('dniEliminar');
    $('#eliminar-archivo-modal').modal('show');
    formularioEliminar(archivoEliminar.value, new Archivo(archivoEliminar.value).getNombreSimple(), 'Eliminar', 'Formulario para eliminar');
})

function formularioExistenciaRepetidaValores(nombreArchivoSubirDatos, nombreArchivoSubirSimple, titulo) {
    $('#titulo-modal').html(titulo);
    $('#version-nuevo-archivo').val('Versión: ' + nombreArchivoSubirDatos[1]);
    $('#nombreArchivoSimple').val(nombreArchivoSubirSimple);
    $('#nombre-archivo').val(nombreArchivoSubirDatos[0]);
    $('#archivoOculto').val(nombreArchivoSubirDatos[0])
    $('#versionOculto').val(nombreArchivoSubirDatos[1])
    $("#subir-campo").change(function() {
        const files = this.files;
        const dt = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            dt.items.add(
                new File(
                    [file.slice(0, file.size, file.type)],
                    file.name
                )
            )
            document.getElementById('archivoContenidoOculto').files = dt.files
        }
    });
}

function formularioEliminar(nombreDelArchivoEliminar, nombreDelArchivoSimple, tipo, titulo) {
    $('#titulo-eliminar').html(titulo)
    $('#eliminarTipoMotivoOculto').val(tipo);
    $('#eliminarArchivoSimpleOculto').val(nombreDelArchivoSimple);
    $('#eliminarArchivoOculto').val(nombreDelArchivoEliminar);
    $('#eliminarArchivoNombre').val(nombreDelArchivoEliminar);
}