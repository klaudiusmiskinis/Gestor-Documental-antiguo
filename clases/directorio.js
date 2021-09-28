const { dir } = require('console');

class Directorio {
    constructor(nombre, ruta, padre) {
        this.nombre = nombre;
        this.ruta = ruta;
        this.padre = padre;
        this.archivos = [];
        this.subDir = [];
    }

    //GETTERs
    getNombre() {
        return this.nombre;
    }

    getRuta() {
        return this.ruta;
    }

    getPadre() {
        return this.padre;
    }

    getArchivos() {
        return this.archivos;
    }

    getSubDir() {
        return this.subDir;
    }

    //SETTERs
    setNombre(nombre) {
        this.nombre = nombre;
    }

    setRuta(ruta) {
        this.ruta = ruta;
    }

    setPadre(padre) {
        this.padre = padre
    }

    setArchivos(archivos){
        this.archivos = archivos;
    }

    setSubDir(subDir) {
        this.subDir = subDir;
    }
}
    

module.exports = Directorio