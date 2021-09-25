const { dir } = require('console');
const fs = require('fs')

class Directorio {
    constructor(nombre, ruta) {
        this.nombre = nombre;
        this.ruta = ruta;
        this.archivos = [];
        this.subDirectorios = [];
    }

    //GETTERs
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

    //SETTERs
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

    //METHODs
    getFiles() {
        let archivos = []
        fs.readdirSync(this.ruta).forEach(file => {
            let type = fs.lstatSync(this.ruta + file)
            if(type.isFile()) {
                archivos.push(file)
            }
        });
        return archivos;
    }

    getInnerDir() {
        let subDir = []
        fs.readdirSync(this.ruta).forEach(dir => {
            let type = fs.lstatSync(this.ruta + dir)
            if(type.isDirectory()) {
                let dirObj = new Directorio(dir, (this.ruta + dir + '/'))
                dirObj.setArchivos(dirObj.getFiles())
                dirObj.setSubDirectorios(dirObj.getInnerDir())
                subDir.push(dirObj)
            }
        });
        return subDir;
    } 
}

module.exports = Directorio, fs