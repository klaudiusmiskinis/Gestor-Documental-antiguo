$('#subir-boton').on('click', function(e) {
    e.preventDefault();
        if (document.getElementById('subir-campo').files[0] != undefined) {
            let encontrado = null;
            let nombres = [];
            var archivo = document.getElementById('subir-campo');
            let nombreArc = archivo.files[0].name;
            let archivos = document.getElementsByClassName('archivo');
            if (archivos.length == 0 && nombreArc.length > 0) {
                $('#subir').submit();
            }
            for(let i = 0; i < archivos.length; i++) {
                nombres.push(archivos[i].innerHTML)
                if(archivos[i].innerHTML === nombreArc) {
                    encontrado = true;
                    Swal.fire({
                        title: 'Ya hay una archivo con ese nombre.<br>' +
                                '¿Quieres crear una nueva versión?',
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
                            let sumada = false;
                            for(let i = 0; i < nombres.length; i++) {
                                version = 0;
                                let nombre = nombres[i].split('_');
                                if (nombre.length > 1) {
                                    let a = nombre[1].split('.')
                                    version = parseInt(a[0])
                                    version++;
                                    sumada = true;
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
                                                    <input type="text" class="mt-1 form-control" id="arcNombre" placeholder='` + nombre[0] + '.' + a[1] + `' readonly>
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
                                      }).then((result2) => {
                                        if (result2.isConfirmed) {
                                            document.getElementById('subir').action = '/subir?nuevaversion=true&version=' + version;
                                            $('#subir').submit();
                                        }
                                    })
                                } else if (!sumada && i == (nombres.length - 1)){
                                    version = 1;
                                    document.getElementById('subir').action += '?nuevaversion=true&version=' + version;
                                    $('#subir').submit();
                                } 
                                if (!(document.getElementById('subir').action).includes('?')) {
                                    document.getElementById('subir').action += '?nuevaversion=true&version=' + version;
                                }
                            }
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