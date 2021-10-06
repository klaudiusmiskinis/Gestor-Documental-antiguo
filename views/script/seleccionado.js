if(document.getElementById('volver')) {
    document.getElementById('volver').onclick = function() {
        volver()
    }
}

//FUNCTION
function volver() {
    window.history.back()
    console.log(history)
}
