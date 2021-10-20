$("#subir-boton").on("click", function(e) {
    e.preventDefault();
        if (document.getElementById('subir-campo').files[0] != undefined){
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
                if(archivos[i].innerHTML === nombre){
                    encontrado = true;
                    Swal.fire({
                        title: 'Ya hay una archivo con ese nombre.<br>' +
                                '¿Quieres crear una nueva versión?',
                        text: "Se creará una nueva versión del archivo.",
                        icon: 'warning',
                        showDenyButton: true,
                        showCancelButton: true,
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
        if (encontrado == false){
            $('#subir').submit();
        }
    }
})