

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
                nombres.push(archivos[i].innerHTML)
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
                                        alertaSubir(nombreArc, version, 'nueva')
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
            alertaSubir(nombreArc, version, 'nueva')
        }
    }
})

$('#info').on('click', function() {
    Swal.fire({
        title: 'Información sobre los archivos.',
        html: `
        Es importante que los archivo que queramos subir no contengan mas que un solo guión bajo.
        
        <div class="container mt-2">
            <div class="row">
                <div class="col border border-success">
                    <p class="text-success  mt-2">BIEN ✓</p>
                </div>
                <div class="col border border-success">
                    <p class="fst-italic  mt-2">archivo.txt</p>
                </div>
                <div class="col border border-success">
                    <p class="fst-italic mt-2">archivo_1.txt</p>
                </div>
            </div>
        </div>

        <div class="container mt-1">
            <div class="row">
                <div class="col border border-danger">
                    <p class="text-danger mt-2">MAL ✗</p>
                </div>
                <div class="col border border-danger">
                <p class="fst-italic mt-2">archivo_a_1.txt</p>
                </div>
                <div class="col border border-danger">
                <p class="fst-italic mt-2">a_archivo_1.txt</p>
                </div>
            </div>
        </div>`,
        focusConfirm: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
});

$('.cerrar').on('click', function(e) {
    e.preventDefault();
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
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(this.id).submit()
        }
    })
});

function alertaSubir(nombre, version, tipo) {
    let inputVersion;
    if (version != null) {
        inputVersion = `<input type="text" class="mt-1 form-control" id="arcVersion" placeholder="` + 'Versión: ' + version + `" readonly></input>`;
    } else {
        inputVersion = '';
    }
    let html = `<div class="form-group">
                    <label>Datos</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre*" autocomplete="off">
                        <input type="text" class="form-control" id="apellidos" placeholder="Apellidos*" autocomplete="off">
                    </div>
                    <div class="input-group mt-1">
                        <input type="text" class="form-control" id="email" placeholder="Nombre del email*" autocomplete="off">
                        <div class="input-group-append">
                            <span class="input-group-text" id="arroba">@fruitsponent.com</span>
                        </div>
                    </div>
                    <textarea type="text"  class="mt-1 form-control"  id="motivos" rows="3" placeholder="Motivos*" autocomplete="off"></textarea>
                    <input type="date" class="mt-1 form-control" id="fecha" autocomplete="off">
                </div>
                <div class="form-group mb-3">
                    <label>Archivo</label>
                    <input type="text" class="mt-1 form-control" id="arcNombre" placeholder='` + nombre + `' readonly>
                    ` + inputVersion + `
                </div>`
    Swal.fire({
        title: 'Registro de cambios',
        html: html,
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
            console.log(tipo)
            document.getElementById('subir').submit();
        }
    })
}