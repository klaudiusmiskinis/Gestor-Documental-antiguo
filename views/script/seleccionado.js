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

//FUNCTION
function volver(){
    window.history.back();
};

function eliminarArchivo(id){
    $('#' + id).submit();
};