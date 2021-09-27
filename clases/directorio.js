const fs = require('fs')

class Directorio {
    constructor(nombre, ruta, padre) {
        this.nombre = nombre;
        this.ruta = ruta;
        this.padre = padre;
        this.archivos = false;
        this.subDirectorios = false;
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

    getSubDirectorios() {
        return this.subDirectorios;
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

    setSubDirectorios(subDirectorios) {
        this.subDirectorios = subDirectorios
    }

    //METHODs
    getFiles() {
        let archivos = []
        fs.readdirSync(this.ruta).forEach(file => {
            if(fs.lstatSync((this.ruta + file)).isFile()){
                archivos.push(file)
            }
        });
        return archivos;
    }

    getInnerDir() {
        let subDir = []
        fs.readdirSync(this.ruta).forEach(dir => {
            if(fs.lstatSync((this.ruta + dir)).isDirectory()){
                let dirObj = new Directorio(dir, (this.ruta + dir + '/'), (this.padre + this.nombre + '/' + dir))
                dirObj.setArchivos(dirObj.getFiles())
                dirObj.setSubDirectorios(dirObj.getInnerDir())
                subDir.push(dirObj)
            }
        });
        return subDir;
    } 
}

module.exports = Directorio, fs