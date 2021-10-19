window.onDOMContentLoaded = function(){
    if (document.title == 'Home') {
        // $(document.getElementById('container-water')).slideDown();
    } else {
        
    }
    let elementos = document.getElementsByClassName('cerrar');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', eliminar, false);
        elementos[i].id = 'cerrar' + i;
        elementos[i].name = 'formEliminar' + i;
    };
    setTimeout(function() {
        if (document.title == 'Home') {
            // $(document.getElementById('container-water')).slideUp();
        }
    }, 1000)
};

$("#subir-input").on("click", function(e) {
    e.preventDefault();
    let clonado = 'asd';
        if (document.getElementById('subir-campo').files[0]) {
        var file = document.getElementById('subir-campo');
        var nombre = file.files[0].name;
        let elementos = document.getElementsByClassName('archivo');
        for (elemento of elementos) {
            if(elemento.innerHTML == nombre) {
                Swal.fire({
                    title: 'Ya hay una archivo con ese nombre<br>' +
                            '¿Quieres crear una nueva versión?',
                    text: "Se creará una nueva versión del archivo",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonColor: 'var(--col)',
                    cancelButtonColor: 'var(--col)',
                    confirmButtonText: 'Crear una nueva versión.',
                    denyButtonText: 'No, sobreescribir el archivo',
                    cancelButtonText: 'Cancelar.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(clonado, 'asdadasdas')
                        clonado = 'ok';
                        document.getElementById('subir').action = document.getElementById('subir').action + '?nuevaversion=true';
                        document.getElementById('subir').submit();
                    } else if (result.isDenied) {
                        console.log(clonado, '12314214')
                        clonado = 'no'
                        onsole.log(clonado)
                        document.getElementById('subir').action = document.getElementById('subir').action + '?nuevaversion=false';
                        document.getElementById('subir').submit();
                    }
                })
            } else if (clonado == 'no') {
                console.log(clonado, 'asd')
                document.getElementById('subir').submit();
            }
        }
    }
})


function eliminar(e){
    e.preventDefault();
    var queryString = $('#' + this.id).serialize();
    let archivoNom = queryString.split('=')[1]
    archivoNom = decodeURI(archivoNom)
    Swal.fire({
        title: '¿Estás seguro de querer eliminar el archivo ' + archivoNom + '?',
        text: "No se podrá recuperar.",
        icon: 'warning',
        showCancelButton: true,
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
            eliminarArchivo(this.id);
        }
      })
};

if(document.getElementById('volver')){
    document.getElementById('volver').onclick = function(){
        volver();
    }
}

if(document.getElementById('regresar')){
    document.getElementById('regresar').onclick = function(){
        volver();
    }
}

//FUNCTION
function volver(){
    window.history.back();
};

function eliminarArchivo(id){
    $('#' + id).submit();
};