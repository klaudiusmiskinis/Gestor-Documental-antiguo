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
    window.history.back()
    console.log(history)
};

window.onload = function(){
    let elementos = document.getElementsByClassName('cerrar');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener('click', eliminar, false);
        elementos[i].id = 'cerrar' + i;
        elementos[i].name = 'formEliminar' + i;
        console.log(elementos[i])
    };
};

function eliminar(id, tiempo){
    setTimeout(function(){ 
        document.getElementById(id).submit()
     }, tiempo);
};


function eliminar(){
    event.preventDefault();

    Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este archivo?',
        text: "Una vez eliminado, no se podrá recuperar.",
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
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    .then((result) => {
        if (result.isConfirmed){
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El archivo ha sido eliminado.',
                icon: 'success',
                confirmButtonColor: 'var(--col)',
                cancelButtonColor: 'var(--col)',
                confirmButtonText: '¡Genial!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            eliminar(this.id, 1500);
        }
    });
};