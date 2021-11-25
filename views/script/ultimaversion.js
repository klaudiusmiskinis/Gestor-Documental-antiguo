mostrarUltimaVersion();

function mostrarUltimaVersion() {
    let archivos = document.getElementsByClassName('archivo');
    let arrArchivos = [];
    let nombres = [];
    let mostrar = [];

    for(let i = 0; i < archivos.length; i++) {
        nombres.push(archivos[i].innerHTML);
        archivos[i].id = 'archivoVersion' + i;
        let data = archivos[i].innerHTML.split('.')[0]
        let version = data.split('_')[1]
        let nombre = data.split('_')[0]
        let obj = {
            id: archivos[i].id,
            nombre: nombre,
            version: parseInt(version)
        }
        arrArchivos.push(obj);
    }

    let dupArr = [];
    var contadorPropiedades = _.countBy(arrArchivos, function (item) {
        return item.nombre;
    });
    
    for (var nombre in contadorPropiedades) {
        if (contadorPropiedades[nombre] > 1) {
            _.where(arrArchivos, {
                nombre: nombre
            }).map(function (item) {
                dupArr.push(item);
            });
        }
    };

    var highest = _.max(dupArr, function(o){return o.version;});
    mostrar.push(highest)
    mostrar.forEach(elementoI => {
        arrArchivos.forEach(elementoJ => {
            if (elementoI.nombre !== elementoJ.nombre) {
                mostrar.push(elementoJ);
            }
        })
    });

    console.log(mostrar)
    mostrar = removeItemOnce(mostrar, -Infinity)
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }
    console.log(mostrar)
}

