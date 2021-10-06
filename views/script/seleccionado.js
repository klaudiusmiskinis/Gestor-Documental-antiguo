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
