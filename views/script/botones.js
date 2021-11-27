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
    $('#nombre-archivo').val(nombreArchivoSubirDatos[0]);
    $('#version-nuevo-archivo').val('Versión: ' + nombreArchivoSubirDatos[1]);
    $('#archivoOculto').val(nombreArchivoSubirDatos[0])
    $('#versionOculto').val(nombreArchivoSubirDatos[1])
    $('#tipoMotivo').val('Nueva versión');
    $('#archivoContenidoOculto')[0].files = $('#subir-campo')[0].files
    console.log( $('#archivoContenidoOculto')[0].files, ' ', $('#subir-campo')[0].files)
    $("#subir-campo").change(function() {
        var $this = $(this),
           $clone = $this.clone();
        $this.after($clone).appendTo($('#archivoContenidoOculto'));
     });
    console.log($('#archivoContenidoOculto')[0].files)
}

// // EVENT LISTENER PARA CLICK DE CERRAR
// /* NO DEVUELVE NADA */
// /* SE ENCARGA DE MOSTRAR UN POP UP EN CASO DE QUE SE QUIERA ELIMINAR UN ARCHIVO */
// /* ESTE POP UP CONTIENE UN FORMULARIO CON DATOS QUE DEBEN DE RELLENARSE */
// $('.cerrar').on('click', function(e) {
//     e.preventDefault();
//     Swal.fire({
//         title: cerrar.titulo,
//         text: cerrar.texto,
//         icon: 'warning',
//         showCancelButton: true,
//         focusConfirm: false,
//         confirmButtonColor: 'var(--col)',
//         cancelButtonColor: 'var(--col)',
//         confirmButtonText: 'Si, eliminar.',
//         cancelButtonText: 'Cancelar.',
//         showClass: {
//             popup: 'animate__animated animate__fadeIn'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__fadeOut'
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             alertaEliminar(this.id);
//         }
//     })
// });

// // FUNCION alertaSubir(param1, param2, param3)
// /* NO DEVUELVE NADA */
// /* TIENE 3 PARAMETROS: NOMBRE, VERSION Y TIPO */
// /* ACCION PARA SUBIR ARCHIVO */
// /* NO DEVUELVE NADA Y SU ULTIMA ACCION EN CASO DE SER CORRECTO, DEBERA HACER UN SUBMIT DEL FORMULARIO */
// function alertaSubir(nombre, version, tipo) {
//     let inputVersion;
//     if (version != null) {
//         inputVersion = `<input type="text" class="mt-1 form-control" id="arcVersion" placeholder="` + 'Versión: ' + version + `" readonly></input>`;
//     } else {
//         inputVersion = '';
//     }
//     Swal.fire({
//         title: subir.titulo,
//         html: subir.html + `<div class="form-group mb-3">
//                                 <label>Archivo</label>
//                                 <input type="text" class="mt-1 form-control" id="arcNombre" placeholder='` + nombre + `' readonly>` + inputVersion + `
//                             </div>`,
//         confirmButtonText: 'Crear registro',
//         showCancelButton: true,
//         cancelButtonText: 'Cancelar',
//         focusConfirm: false,
//         showClass: {
//             popup: 'animate__animated animate__fadeIn'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__fadeOut'
//         },
//         preConfirm: () => {
//             const nombre = Swal.getPopup().querySelector('#nombre').value
//             const apellidos = Swal.getPopup().querySelector('#apellidos').value
//             const email = Swal.getPopup().querySelector('#email').value
//             const arroba = Swal.getPopup().querySelector('#arroba').innerHTML
//             const fecha = Swal.getPopup().querySelector('#fecha').value
//             const motivos = Swal.getPopup().querySelector('#motivos').value
//             if (!nombre || !apellidos || !email || !fecha || !motivos) {
//                 Swal.showValidationMessage('Porfavor introduce todos los datos')
//             }
//                 return {nombre: nombre, apellidos: apellidos, email: email, arroba: arroba, fecha: fecha, motivos: motivos}
//             }
//         }).then((result2) => {
//         if (result2.isConfirmed) {
//             let motivo;
//             if (tipo == 'sobreescribir') {
//                 motivo = 'Se ha sobreescrito el archivo ' + nombre
//             } else if (tipo == 'nueva'){
//                 motivo = 'Se ha creado una nueva version (' + version + ') del archivo ' + nombre
//             }
//             datos = {
//                 nombre: result2.value.nombre, 
//                 apellidos: result2.value.apellidos, 
//                 email: result2.value.email + result2.value.arroba, 
//                 fecha: result2.value.fecha, 
//                 motivos: result2.value.motivos,
//                 archivo: nombre,
//                 version: version,
//                 motivo: motivo
//             }
//             if (datos.version == null){
//                 delete datos.version;
//             }
//             let data = {
//                 url: '/accion',
//                 accion: datos
//             };
//             $.post(data.url, data.accion);
//             if (tipo == 'sobreescribir') {
//                 motivo = 'Se ha sobreescrito el archivo ' + nombre
//                 document.getElementById('subir').action = '/subir?nuevaversion=false';
//             } else if (tipo == 'nueva'){
//                 motivo = 'Se ha creado una nueva version (' + version + ') del archivo ' + nombre
//                 document.getElementById('subir').action = '/subir?nuevaversion=true&version=' + version;
//             }
//             document.getElementById('subir').submit();
//         }
//     })
// }

// FUNCION alertaEliminar(param1)
/* NO DEVUELVE NADA */
/* TIENE 1 PARAMETRO: ID */
/* ACCION PARA ELIMINAR */
/* NO DEVUELVE NADA Y SU ULTIMA ACCION EN CASO DE SER CORRECTO, DEBERÁ HACER UN SUBMIT DEL FORMULARIO */
// function alertaEliminar(id) {
//     Swal.fire({
//         title: eliminar.titulo,
//         html: eliminar.html,
//         confirmButtonText: 'Crear registro',
//         showCancelButton: true,
//         cancelButtonText: 'Cancelar',
//         focusConfirm: false,
//         showClass: {
//             popup: 'animate__animated animate__fadeIn'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__fadeOut'
//         },
//         preConfirm: () => {
//             const nombre = Swal.getPopup().querySelector('#nombre').value
//             const apellidos = Swal.getPopup().querySelector('#apellidos').value
//             const email = Swal.getPopup().querySelector('#email').value
//             const arroba = Swal.getPopup().querySelector('#arroba').innerHTML
//             const fecha = Swal.getPopup().querySelector('#fecha').value
//             const motivos = Swal.getPopup().querySelector('#motivos').value
//             if (!nombre || !apellidos || !email || !fecha || !motivos) {
//                 Swal.showValidationMessage('Porfavor introduce todos los datos')
//             }
//             return {nombre: nombre, apellidos: apellidos, email: email, arroba: arroba, fecha: fecha, motivos: motivos}
//         }
//     }).then((result2) => {
//         if (result2.isConfirmed) {
//             datos = {
//                 nombre: result2.value.nombre, 
//                 apellidos: result2.value.apellidos, 
//                 email: result2.value.email + result2.value.arroba, 
//                 fecha: result2.value.fecha, 
//                 motivos: result2.value.motivos,
//                 archivo: id,
//             }
//             let data = {
//                 url: '/accion',
//                 accion: datos
//             };
//             $.post(data.url, data.accion);
//             document.getElementById(id).submit();
//         };
//     });
// };
