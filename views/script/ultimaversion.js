mostrarUltimaVersion();

function mostrarUltimaVersion() {
    let archivos = document.getElementsByClassName('archivo');
    let arrArchivos = [];
    let nombres = [];
    let mostrar = [];

    for(let i = 0; i < archivos.length; i++) {
        archivos[i].id = 'archivoVersion' + i;
        let obj = {
            id: archivos[i].id,
            nombre: archivos[i].innerHTML
        }
        arrArchivos.push(obj);
        nombres.push(archivos[i].innerHTML);
    }
    
    let version;
    for(let i = 0; i < nombres.length; i++) {
        let comparacion = nombres[i];
        for (let j = 0; j < arrArchivos.length; j++){
            if (arrArchivos[j].nombre.includes(comparacion)) {
                console.log('Igual', comparacion, arrArchivos[j].nombre)
                version = arrArchivos[j].nombre.split('.')[0];
                version = version.split('_')[1];
                console.log(version);
            } else {
                // console.log('No igual', arrArchivos[j].nombre, comparacion)
            }
        }
    }
}