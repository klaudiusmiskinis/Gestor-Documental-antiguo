
$('#ultimaVersion').on('click', function(e) {
    $(this).toggleClass('ultima');
    let archivos = document.getElementsByClassName('archivo');
    if ($(this).hasClass('ultima')) {
        let hijo = $(this).children()[0];
        hijo.src = 'http://localhost:3000/assets/img-svg/eyecross.svg';
        let ultimos = mostrarUltimaVersion();
        ultimos.forEach(ultimo => {
            for (let i = 0; i < archivos.length; i++) {
                let padre = $('#' + archivos[i].id).parents()[3]
                $('#' + padre.id).fadeOut('fast');
                if (ultimo.id === archivos[i].id) {
                    archivos = _(archivos).filter(function(item) {
                        return item.id !== ultimo.id
                    });
                    $('#' + padre.id).fadeIn('fast');
                }
            }
        });   
    } else {
        let hijo = $(this).children()[0];
        hijo.src = 'http://localhost:3000/assets/img-svg/eye.svg'
        for (let i = 0; i < archivos.length; i++) {
            let padre = $('#' + archivos[i].id).parents()[3]
            $('#' + padre.id).fadeIn('fast');
        }
    }
});

function mostrarUltimaVersion() {
    let archivos = document.getElementsByClassName('archivo');
    let arrArchivos = [];
    let nombres = [];
    let mostrar = [];

    if (archivos.length > 1) {
        for(let i = 0; i < archivos.length; i++) {
            nombres.push(archivos[i].innerHTML);
            archivos[i].id = 'archivoVersion' + i;
            let data = archivos[i].innerHTML.split('.')[0]
            let mayor = data.split('_')[1]
            let nombre = data.split('_')[0]
            let obj = {
                id: archivos[i].id,
                nombre: nombre,
                mayor: parseInt(mayor)
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
    
        var highest = _.max(dupArr, function(o){return o.mayor;});
        mostrar.push(highest)
        mostrar.forEach(elementoI => {
            arrArchivos.forEach(elementoJ => {
                if (elementoI.nombre !== elementoJ.nombre) {
                    mostrar.push(elementoJ);
                }
            })
        });
    
        mostrar = removeItemOnce(mostrar, -Infinity)
        function removeItemOnce(arr, value) {
            var index = arr.indexOf(value);
            if (index > -1) {
              arr.splice(index, 1);
            }
            return arr;
        }
        return mostrar;
    }
}
