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

$("#subir-boton").on("click", function(e) {
    e.preventDefault();
    let encontrado = null;
    var archivo = document.getElementById('subir-campo');
    let nombre = archivo.files[0].name;
    let archivos = document.getElementsByClassName('archivo');
    if (archivos.length == 0 && nombre.length > 0) {
        $('#subir').submit();
    }
    for(let i = 0; i < archivos.length; i++) {
        if(archivos[i].innerHTML === nombre){
            encontrado = true;
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
                    document.getElementById('subir').action += '?nuevaversion=true';
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