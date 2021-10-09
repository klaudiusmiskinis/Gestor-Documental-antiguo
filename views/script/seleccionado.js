if(document.getElementById('volver')) {
    document.getElementById('volver').onclick = function() {
        volver()
    }
}

if(document.getElementById('regresar')) {
    document.getElementById('regresar').onclick = function() {
        volver()
    }
}

//FUNCTION
function volver() {
    window.history.back()
    console.log(history)
}

window.onload = function() {
    let elementos = document.getElementsByClassName('cerrar')
    for(let i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', eliminar())
    }
}


function eliminar() {
    Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este archivo?',
        text: "Una vez eliminado, no se podrá recuperar.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminado!',
            'El archivo ha sido eliminado.',
            'success'
          )
        }
      })
}