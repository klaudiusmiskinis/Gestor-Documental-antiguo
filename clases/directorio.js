class Directorio {
    constructor(nombre, ruta, archivos, subDirectorios){
        this.nombre = nombre;
        this.ruta = ruta;
        this.archivos = archivos;
        this.subDirectorios = Directorio;
    }

    getNombre() {
        return this.nombre;
    }

    getRuta() {
        return this.ruta;
    }

    getArchivos() {
        return this.archivos;
    }

    getSubDirectiorios() {
        return this.subDirectorios;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setRuta(ruta) {
        this.ruta = ruta;
    }

    setArchivos(archivos){
        this.archivos = archivos;
    }

    setSubDirectorios(subDirectorios) {
        this.subDirectorios = subDirectorios
    }
}

module.exports = Directorio