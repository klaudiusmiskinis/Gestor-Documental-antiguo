class Archivo {
    //CONSTRUCTOR
    constructor(nombreCompleto, nombreSimple, extension, version) {
        this.nombreCompleto = nombreCompleto,
        this.nombreSimple = nombreSimple,
        this.extension = extension,
        this.version = version
    }

    //GETTERs
    get nombreCompleto() {
        return this.nombreCompleto;
    }

    get nombreSimple(){
        return this.nombreSimple;
    }

    get extension(){
        return this.extension;
    }

    get version() {
        return this.version;
    }

    //SETTERs
    set nombreCompleto(nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    set nombreSimple(nombreSimple) {
        this.nombreSimple = nombreSimple;
    }

    set extension(extension) {
        this.extension = extension;
    }

    set version(version) {
        this.version = version;
    }
}