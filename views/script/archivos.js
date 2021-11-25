class Archivo {
    //CONSTRUCTOR
    constructor(nombreCompleto) {
        this.nombreCompleto = nombreCompleto,
        this.nombreSimple = this.init()[0],
        this.extension = this.init()[1],
        this.version = this.init()[2]
    };

    //GETTERs
    getNombreCompleto() {
        return this.nombreCompleto;
    };

    getNombreSimple(){
        return this.nombreSimple;
    };

    getExtension(){
        return this.extension;
    };

    getVersion() {
        return this.version;
    };

    //SETTERs
    setNombreCompleto(nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    };

    setNombreSimple(nombreSimple) {
        this.nombreSimple = nombreSimple;
    };

    setExtension(extension) {
        this.extension = extension;
    };

    seVersion(version) {
        this.version = version;
    };

    //METHODs
    datos() {
        return [this.getNombreCompleto(), this.getNombreSimple(), this.getExtension(), this.getVersion()]
    };

    init() {
        let nombre = this.getNombreCompleto();
        nombre = nombre.split('.');
        let extension = nombre[1];
        let version = nombre[0].split('_')[1] ?? 0;
        version = parseInt(version);
        nombre = nombre[0].split('_')[0] + '.' + extension;
        return [nombre, extension, version];
    };
};

arrayArchivos = []

let archivos = document.getElementsByClassName('archivo');
for (let i = 0; i < archivos.length; i++) {
    const element = archivos[i];
    let archivo = new Archivo(archivos[i].innerHTML);
    arrayArchivos.push(archivo);
}

console.log(arrayArchivos)