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
    /* Inicializa el objeto */
    init() {
        let nombre = this.getNombreCompleto().split('.');
        this.setExtension(nombre.pop());
        this.setVersion(parseInt(nombre[0].split('_')[1] ?? 0));
        this.setNombreSinVersion(nombre[0].split('_')[0]);
        this.setNombreSinExtension(nombre[0])
        this.setNombreSimple(this.getNombreSinVersion() + '.' + this.getExtension())
    };

    /* Devuelve todos los atributos de la instancia */
    datos() {
        return [this.getNombreCompleto(), this.getNombreSinVersion(), this.getNombreSinExtension(), this.getNombreSimple(), this.getExtension(), this.getVersion(), this.getRepetido(), this.getMayor()]
    };

    /* Evalua si el archivo a comparar es una versión mayor o menor si los atributos coinciden */
    compararArchivosRepetidos(archivo) {
        if (this.getNombreSimple() === archivo.getNombreSimple()) {
            this.setRepetido(true);
            archivo.setRepetido(true);
            if (this.getVersion() > archivo.getVersion()){
                this.setMayor(true);
                archivo.setMayor(false)
            } else {
                this.setMayor(false);
                archivo.setMayor(true);
            }
        }
    }

    /* Comprueba si el nombre del archivo a subir existe en la carpeta en la que se va a subir */
    comprobarExistencia(nombreDeArchivo){
        let nombreDeArchivoSimple = this.generarNombreSimple(nombreDeArchivo);
        if (this.getNombreSimple() === nombreDeArchivoSimple) {
            return true;
        } else {
            return false;
        }
    }

    /* Genera el archivo que se utilizara para subir  */
    generarDatosPorNombreDeArchivo(nombreDeArchivo){
        let nombreDeArchivoSimple = this.generarNombreSimple(nombreDeArchivo);
        let nombreDeArchivoVersion = (nombreDeArchivo.split('.')[0]).split('_')[1] ?? 0;
        if (nombreDeArchivoSimple === this.getNombreSimple()) {
            if (this.getVersion() >= nombreDeArchivoVersion) {
                nombreDeArchivoVersion = (this.getVersion() + 1)
                return this.nombreSinVersion + '_' + nombreDeArchivoVersion + '.' + this.getExtension();
            }
        }
        return nombreDeArchivo;
    }

    generarDatosPorNombreDeArchivoSinSuma(nombreDeArchivo){
        let nombreDeArchivoSimple = this.generarNombreSimple(nombreDeArchivo);
        let nombreDeArchivoVersion = (nombreDeArchivo.split('.')[0]).split('_')[1] ?? 0;
        if (nombreDeArchivoSimple === this.getNombreSimple()) {
            if (this.getVersion() >= nombreDeArchivoVersion) {
                nombreDeArchivoVersion = (this.getVersion())
                return this.nombreSinVersion + '_' + nombreDeArchivoVersion + '.' + this.getExtension();
            }
        }
        return nombreDeArchivo;
    }

    generarNombreSimple(nombreDeArchivo) {
        if (nombreDeArchivo.includes('_')) {
            return (nombreDeArchivo.split('_')[0] + '.' + nombreDeArchivo.split('.').pop())
        } else {
            return (nombreDeArchivo.split('_')[0])
        }
    }

    comprobarParentesis(nombreArchivoSubir) {
        if (/\([\d]+\)/.test(nombreArchivoSubir)) {
            nombreArchivoSubir = nombreArchivoSubir.replace(/ *\([^)]*\) */g, "");
            return nombreArchivoSubir;
        } else {
            return nombreArchivoSubir;
        }
    }

    generarDatosFormularioExistente(nombreDeArchivo) {
        let nombreDeArchivoVersion = (nombreDeArchivo.split('.')[0]).split('_')[1] ?? 0;
        return [nombreDeArchivo, nombreDeArchivoVersion];
    }

    esconder() {
        $('#' + this.elementoPadre.id).fadeOut();
    }

    mostrar() {
        $('#' + this.elementoPadre.id).fadeIn();
    }
};