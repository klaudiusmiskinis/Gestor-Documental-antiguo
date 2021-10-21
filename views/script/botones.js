$('#subir-boton').on('click', function(e) {
    e.preventDefault();
        if (document.getElementById('subir-campo').files[0] != undefined) {
            let encontrado = null;
            let nombres = [];
            var archivo = document.getElementById('subir-campo');
            let nombre = archivo.files[0].name;
            let archivos = document.getElementsByClassName('archivo');
            if (archivos.length == 0 && nombre.length > 0) {
                $('#subir').submit();
            }
            for(let i = 0; i < archivos.length; i++) {
                nombres.push(archivos[i].innerHTML)
                if(archivos[i].innerHTML === nombre) {
                    encontrado = true;
                    Swal.fire({
                        title: 'Ya hay una archivo con ese nombre.<br>' +
                                '¿Quieres crear una nueva versión?',
                        text: 'Se creará una nueva versión del archivo.',
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
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutDown'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let version = 0;
                            for(nombre of nombres) {
                                version = 0;
                                nombre = nombre.split('_');
                                if (nombre.length > 1) {
                                    let a = nombre[1].split('.')[0]
                                    version = parseInt(a)
                                    version++;
                                    Swal.fire({
                                        title: 'Registro de cambios',
                                        html: `
                                                <div class="form-group mb-3">
                                                    <label>Datos</label>
                                                    <input type="text" class="form-control" id="nombre" placeholder="Introduce tu nombre" autocomplete="off">
                                                    <input type="text" class="mt-1 form-control" id="apellidos" placeholder="Introduce tus apellidos" autocomplete="off">
                                                    <input type="text" class="mt-1 form-control" id="email" placeholder="Introduce tu email" autocomplete="off">
                                                    <input type="date" class="mt-1 form-control" id="fecha" autocomplete="off">
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label>Archivo</label>
                                                    <input type="text" class="mt-1 form-control" id="arcNombre" placeholder="` + nombre + `" readonly>
                                                    <input type="text" class="mt-1 form-control" id="arcVersion" placeholder="` + 'Versión: ' + version + `" readonly>
                                                </div>`,
                                        confirmButtonText: 'Crear registro',
                                        showCancelButton: true,
                                        cancelButtonText: 'Cancelar',
                                        focusConfirm: false,
                                        preConfirm: () => {
                                          const nombre = Swal.getPopup().querySelector('#nombre').value
                                          const apellidos = Swal.getPopup().querySelector('#apellidos').value
                                          const email = Swal.getPopup().querySelector('#email').value
                                          const fecha = Swal.getPopup().querySelector('#fecha').value
                                          if (!nombre || !apellidos || !email || !fecha) {
                                            Swal.showValidationMessage(`Porfavor introduce todos los datos`)
                                          }
                                          return {nombre: nombre, apellidos: apellidos, email: email, fecha: fecha}
                                        }
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire(`
                                                nombre: ${result.value.nombre}
                                                fecha: ${result.value.fecha}
                                            `.trim())
                                        }
                                    })
                                } else {
                                    version = 1;
                                }
                            }
                            document.getElementById('subir').action += '?nuevaversion=true&version=' + version;
                            $('#subir').submit();
                        } else if (result.isDenied) {
                            document.getElementById('subir').action += '?nuevaversion=false';
                            $('#subir').submit();
                        } 
                    })    
                }
                if (i == (archivos.length -1) && encontrado == null) {
                    encontrado = false;
                }
            }
        if (encontrado == false) {
            $('#subir').submit();
        }
    }
})

$('.cerrar').on('click', function(event) {
    event.preventDefault();
    Swal.fire({
        title: '¿Estás seguro de querer eliminar el archivo ' + this.id + ' ?',
        text: 'No se podrá recuperar.',
        icon: 'warning',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: 'var(--col)',
        cancelButtonColor: 'var(--col)',
        confirmButtonText: 'Si, eliminar.',
        cancelButtonText: 'Cancelar.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(this.id).submit()
        }
    })
});