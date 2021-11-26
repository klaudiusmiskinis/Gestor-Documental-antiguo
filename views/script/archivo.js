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
        this.repetido = null;
        this.mayor = null;
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

    getRepetido() {
        return this.repetido;
    }

    getMayor(){
        return this.mayor;
    }

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

    setRepetido(repetido) {
        if (repetido) {
            this.repetido = true;
        } else {
            this.repetido = false;
        }
    }

    setMayor(mayor) {
        if (mayor){
            this.mayor = true;
        } else {
            this.mayor = false;
        }
    }

    //METHODs
    init() {
        let nombre = this.getNombreCompleto().split('.');
        this.setExtension(nombre.pop());
        this.setVersion(parseInt(nombre[0].split('_')[1] ?? 0));
        this.setNombreSinVersion(nombre[0].split('_')[0]);
        this.setNombreSinExtension(nombre[0])
        this.setNombreSimple(this.getNombreSinVersion() + '.' + this.getExtension())
    };

    datos() {
        return [this.getNombreCompleto(), this.getNombreSinVersion(), this.getNombreSinExtension(), this.getNombreSimple(), this.getExtension(), this.getVersion(), this.getRepetido(), this.getMayor()]
    };

    compararArchivosRepetidos(archivo) {
        if (this.nombreSimple === archivo.nombreSimple) {
            this.setRepetido(true);
            archivo.setRepetido(true);
            if(this.version > archivo.version){
                this.setMayor(true);
                archivo.setMayor(false)
            } else {
                this.setMayor(false);
                archivo.setMayor(true);
            }
        }
    }

    esconder() {
        $('#' + this.elementoPadre.id).fadeOut();
    }

    mostrar() {
        $('#' + this.elementoPadre.id).fadeIn();
    }
};