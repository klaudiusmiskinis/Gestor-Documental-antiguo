class Archivo {
    //CONSTRUCTOR
    constructor(nombreCompleto, elementoPadre) {
        this.nombreCompleto = nombreCompleto,
        this.elementoPadre = elementoPadre,
        this.nombreSinVersion;
        this.nombreSinExtension;
        this.nombreSimple;
        this.extension;
        this.version;
        this.init();
    };

    //GETTERs
    getNombreCompleto() {
        return this.nombreCompleto;
    };

    getElementoPadre() {
        return this.elementoPadre;
    }

    getNombreSinVersion(){
        return this.nombreSinVersion;
    };
    
    getNombreSinExtension(){
        return this.nombreSinExtension;
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

    setElementoPadre(elementoPadre) {
        this.elementoPadre = elementoPadre;
    }

    setNombreSinVersion(nombreSinVersion){
        this.nombreSinVersion = nombreSinVersion;
    };

    setNombreSinExtension(nombreSinExtension){
        this.nombreSinExtension = nombreSinExtension
    };

    setNombreSimple(nombreSimple) {
        this.nombreSimple = nombreSimple;
    };

    setExtension(extension) {
        this.extension = extension;
    };

    setVersion(version) {
        this.version = version;
    };

    //METHODs
    datos() {
        return [this.getNombreCompleto(), this.getNombreSinVersion(), this.getNombreSinExtension(), this.getNombreSimple(), this.getExtension(), this.getVersion()]
    };

    init() {
        let nombre = this.getNombreCompleto().split('.');
        this.setExtension(nombre.pop());
        this.setVersion(parseInt(nombre[0].split('_')[1] ?? 0));
        this.setNombreSinVersion(nombre[0].split('_')[0]);
        this.setNombreSinExtension(nombre[0])
        this.setNombreSimple(this.getNombreSinVersion() + '.' + this.getExtension())
    };
};

arrayArchivos = []

$('.archivo').each(function(i) {
    arrayArchivos.push(new Archivo($(this).text(), $(this).parents()[3]))
});

console.log(arrayArchivos)