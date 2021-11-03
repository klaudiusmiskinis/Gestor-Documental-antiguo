let info = {
    titulo: 'Información sobre los archivos.',
    html: `Es importante que los archivo que queramos subir no contengan mas que un solo guión bajo.
    <div class="container mt-2">
        <div class="row">
            <div class="col border border-success">
                <p class="text-success  mt-2">BIEN ✓</p>
            </div>
            <div class="col border border-success">
                <p class="fst-italic  mt-2">archivo.txt</p>
            </div>
            <div class="col border border-success">
                <p class="fst-italic mt-2">archivo_1.txt</p>
            </div>
        </div>
    </div>
    <div class="container mt-1">
        <div class="row">
            <div class="col border border-danger">
                <p class="text-danger mt-2">MAL ✗</p>
            </div>
            <div class="col border border-danger">
            <p class="fst-italic mt-2">archivo_a_1.txt</p>
            </div>
            <div class="col border border-danger">
            <p class="fst-italic mt-2">a_archivo_1.txt</p>
            </div>
        </div>
    </div>`
}

let subir = {
    titulo: 'Registro de cambios',
    html: `<div class="form-group">
                <label>Datos</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre*" autocomplete="off">
                    <input type="text" class="form-control" id="apellidos" placeholder="Apellidos*" autocomplete="off">
                </div>
                <div class="input-group mt-1">
                    <input type="text" class="form-control" id="email" placeholder="Nombre del email*" autocomplete="off">
                    <div class="input-group-append">
                        <span class="input-group-text" id="arroba">@fruitsponent.com</span>
                    </div>
                </div>
                <textarea type="text"  class="mt-1 form-control"  id="motivos" rows="3" placeholder="Motivos*" autocomplete="off"></textarea>
                <input type="date" class="mt-1 form-control" id="fecha" autocomplete="off">
            </div>`
}

let eliminar = {
    titulo: 'Registro de cambios.',
    html: `<div class="form-group">
                <label>Datos</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre*" autocomplete="off">
                    <input type="text" class="form-control" id="apellidos" placeholder="Apellidos*" autocomplete="off">
                </div>
                <div class="input-group mt-1">
                    <input type="text" class="form-control" id="email" placeholder="Nombre del email*" autocomplete="off">
                    <div class="input-group-append">
                        <span class="input-group-text" id="arroba">@fruitsponent.com</span>
                    </div>
                </div>
                <textarea type="text"  class="mt-1 form-control"  id="motivos" rows="3" placeholder="Motivos*" autocomplete="off"></textarea>
                <input type="date" class="mt-1 form-control" id="fecha" autocomplete="off">
            </div>`
}

let cerrar = {
    titulo: '¿Estás seguro de querer eliminar el archivo ' + this.id + ' ?',
    texto: 'No se podrá recuperar.'
}