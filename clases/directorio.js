const fs = require('fs')

class Directorio {
    constructor(nombre, ruta) {
        this.nombre = nombre;
        this.ruta = ruta;
        this.archivos = [];
        this.subDirectorios = [];
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


    getFiles() {
        let archivos = []
        fs.readdirSync(this.ruta).forEach(file => {
            if(file.includes('.')){
                archivos.push(file)
            }
        });
        return archivos;
    }

    getInnerDir() {
        let subDir = []
        fs.readdirSync(this.ruta).forEach(dir => {
            if(!dir.includes('.')){
                let dirObj = new Directorio(dir, (this.ruta + dir + '/'))
                dirObj.setArchivos(dirObj.getFiles())
                dirObj.setSubDirectorios(dirObj.getInnerDir())
                subDir.push(dirObj)
            }
        });
        return subDir;
    }
    
}

module.exports = Directorio