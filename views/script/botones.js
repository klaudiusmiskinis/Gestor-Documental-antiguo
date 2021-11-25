// EVENT LISTENER PARA CLICK DE BOTON-SUBIR
/* NO DEVUELVE NADA */
/* SE ENCARGA DE VER QUE ARCHIVOS TIENEN EL MISMO NOMBRE QUE EL ARCHIVO QUE SE VA A SUBIR */
/* DEPENDIENDO DE LA RESPUESTA DEL FORMULARIO SE HARA UNA ACCION U OTRA */
$('#subir-boton').on('click', function(e) {
    e.preventDefault();
        if (document.getElementById('subir-campo').files[0] != undefined) {
            var archivo = document.getElementById('subir-campo');
            let nombreArc = archivo.files[0].name;
            let archivos = document.getElementsByClassName('archivo');
            let encontrado = null;
            let nombres = [];
            if (archivos.length == 0 && nombreArc.length > 0) {
                document.getElementById('subir').submit();
            }
            for(let i = 0; i < archivos.length; i++) {
                nombres.push(archivos[i].innerHTML);
                if(archivos[i].innerHTML === nombreArc) {
                    encontrado = true;
                    Swal.fire({
                        title: '¿Quieres crear una nueva versión?',
                        text: 'Ya hay archivo con ese nombre.',  
                        icon: 'warning',
                        showDenyButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonColor: 'var(--col)',
                        cancelButtonColor: 'var(--col)',
                        confirmButtonText: 'Si, crear una nueva versión.',
                        denyButtonText: 'No, sobreescribir el archivo.',
                        cancelButtonText: 'Cancelar.',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOut'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let version = 0;
                            let sumada = false;
                            for(let i = 0; i < nombres.length; i++) {
                                version = 0;
                                let nombre = nombres[i].split('_');
                                if (nombre.length > 1) {
                                    let a = nombre[1].split('.')
                                    version = parseInt(a[0])
                                    version++;
                                    sumada = true;
                                    alertaSubir(nombreArc, version, 'nueva')
                                } else if (!sumada && i == (nombres.length - 1)){
                                    version = 1;
                                    if (version == 1) {
                                        alertaSubir(nombreArc, version, 'nueva');
                                    }
                                } 
                                if (!(document.getElementById('subir').action).includes('?')) {
                                    document.getElementById('subir').action += '?nuevaversion=true&version=' + version;
                                }
                            }
                        } else if (result.isDenied) {
                            version = null
                            alertaSubir(nombreArc, version, 'sobreescribir')
                        } 
                    })    
                }
                if (i == (archivos.length -1) && encontrado == null) {
                    encontrado = false;
                }
            } 
        if (encontrado == false) {
            version = 0;
            alertaSubir(nombreArc, version, 'nueva');
        }
    }
})

// EVENT LISTENER PARA CLICK DE INFO
/* NO DEVUELVE NADA */
/* SE ENCARGA DE MOSTRAR UNA MINI-GUÍA PARA VER COMO DEBE DE SER EL NOMBRE DEL ARCHIVO */
/* PARA QUE LA COMPROBACIÓN SEA LA CORRECTA Y EL FIN DE LA APP SEA VÁLIDA */
$('#info').on('click', function() {
    Swal.fire({
        title: info.titulo,
        html: info.html,
        focusConfirm: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
    })
});

// EVENT LISTENER PARA CLICK DE CERRAR
/* NO DEVUELVE NADA */
/* SE ENCARGA DE MOSTRAR UN POP UP EN CASO DE QUE SE QUIERA ELIMINAR UN ARCHIVO */
/* ESTE POP UP CONTIENE UN FORMULARIO CON DATOS QUE DEBEN DE RELLENARSE */
$('.cerrar').on('click', function(e) {
    e.preventDefault();
    Swal.fire({
        title: cerrar.titulo,
        text: cerrar.texto,
        icon: 'warning',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: 'var(--col)',
        cancelButtonColor: 'var(--col)',
        confirmButtonText: 'Si, eliminar.',
        cancelButtonText: 'Cancelar.',
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            alertaEliminar(this.id);
        }
    })
});

// FUNCION alertaSubir(param1, param2, param3)
/* NO DEVUELVE NADA */
/* TIENE 3 PARAMETROS: NOMBRE, VERSION Y TIPO */
/* ACCION PARA SUBIR ARCHIVO */
/* NO DEVUELVE NADA Y SU ULTIMA ACCION EN CASO DE SER CORRECTO, DEBERA HACER UN SUBMIT DEL FORMULARIO */
function alertaSubir(nombre, version, tipo) {
    let inputVersion;
    if (version != null) {
        inputVersion = `<input type="text" class="mt-1 form-control" id="arcVersion" placeholder="` + 'Versión: ' + version + `" readonly></input>`;
    } else {
        inputVersion = '';
    }
    Swal.fire({
        title: subir.titulo,
        html: subir.html + `<div class="form-group mb-3">
                                <label>Archivo</label>
                                <input type="text" class="mt-1 form-control" id="arcNombre" placeholder='` + nombre + `' readonly>` + inputVersion + `
                            </div>`,
        confirmButtonText: 'Crear registro',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        },
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const apellidos = Swal.getPopup().querySelector('#apellidos').value
            const email = Swal.getPopup().querySelector('#email').value
            const arroba = Swal.getPopup().querySelector('#arroba').innerHTML
            const fecha = Swal.getPopup().querySelector('#fecha').value
            const motivos = Swal.getPopup().querySelector('#motivos').value
            if (!nombre || !apellidos || !email || !fecha || !motivos) {
                Swal.showValidationMessage('Porfavor introduce todos los datos')
            }
                return {nombre: nombre, apellidos: apellidos, email: email, arroba: arroba, fecha: fecha, motivos: motivos}
            }
        }).then((result2) => {
        if (result2.isConfirmed) {
            let motivo;
            if (tipo == 'sobreescribir') {
                motivo = 'Se ha sobreescrito el archivo ' + nombre
            } else if (tipo == 'nueva'){
                motivo = 'Se ha creado una nueva version (' + version + ') del archivo ' + nombre
            }
            datos = {
                nombre: result2.value.nombre, 
                apellidos: result2.value.apellidos, 
                email: result2.value.email + result2.value.arroba, 
                fecha: result2.value.fecha, 
                motivos: result2.value.motivos,
                archivo: nombre,
                version: version,
                motivo: motivo
            }
            if (datos.version == null){
                delete datos.version;
            }
            let data = {
                url: '/accion',
                accion: datos
            };
            $.post(data.url, data.accion);
            if (tipo == 'sobreescribir') {
                motivo = 'Se ha sobreescrito el archivo ' + nombre
                document.getElementById('subir').action = '/subir?nuevaversion=false';
            } else if (tipo == 'nueva'){
                motivo = 'Se ha creado una nueva version (' + version + ') del archivo ' + nombre
                document.getElementById('subir').action = '/subir?nuevaversion=true&version=' + version;
            }
            document.getElementById('subir').submit();
        }
    })
}

// FUNCION alertaEliminar(param1)
/* NO DEVUELVE NADA */
/* TIENE 1 PARAMETRO: ID */
/* ACCION PARA ELIMINAR */
/* NO DEVUELVE NADA Y SU ULTIMA ACCION EN CASO DE SER CORRECTO, DEBERÁ HACER UN SUBMIT DEL FORMULARIO */
function alertaEliminar(id) {
    Swal.fire({
        title: eliminar.titulo,
        html: eliminar.html,
        confirmButtonText: 'Crear registro',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        },
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const apellidos = Swal.getPopup().querySelector('#apellidos').value
            const email = Swal.getPopup().querySelector('#email').value
            const arroba = Swal.getPopup().querySelector('#arroba').innerHTML
            const fecha = Swal.getPopup().querySelector('#fecha').value
            const motivos = Swal.getPopup().querySelector('#motivos').value
            if (!nombre || !apellidos || !email || !fecha || !motivos) {
                Swal.showValidationMessage('Porfavor introduce todos los datos')
            }
            return {nombre: nombre, apellidos: apellidos, email: email, arroba: arroba, fecha: fecha, motivos: motivos}
        }
    }).then((result2) => {
        if (result2.isConfirmed) {
            datos = {
                nombre: result2.value.nombre, 
                apellidos: result2.value.apellidos, 
                email: result2.value.email + result2.value.arroba, 
                fecha: result2.value.fecha, 
                motivos: result2.value.motivos,
                archivo: id,
            }
            let data = {
                url: '/accion',
                accion: datos
            };
            $.post(data.url, data.accion);
            document.getElementById(id).submit();
        };
    });
};