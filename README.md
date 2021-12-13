# NodeJS-FileSystem

Proyecto desarrollado con la necesidad de poder reflejar de manera Web un directorio de manera recursiva.
El proposito de esto es poder tener un gestor documental web. El cual por Sistema Operativo no ofrece acceso a los usuarios pero si de manera Web.
Otro proposito importante es poder contar con un gestor documental por versiones. El cual nos permite subir, sobreescribir y revisar las version de un archivo.

### ¿Qué ofrece este proyecto?

La posibilidad de trabajar con archivos del sistema (FileSystem) y la implementacion Web relacionada con estos archivos.


## Node
### Dependencias

Para instalar las dependecias podemos utilizar el siguiente comando en nuestro CLI con la ruta del proyecto.
```
npm install
``` 

### Variables de entorno

Debemos abrir el archivo '.env.template'. A continuación, eliminamos '.template' del nombre del archivo.
Ejemplo:
```
.env.template => .env
``` 
Seguidamente nos dirigimos al archivo y damos valor a las variables adaptadas a nuestro despligue.

### Bugs conocidos

1. Los tiempos de carga con un directorio que contenga de 1GB puede ser bastante largo. (Depende del PC donde se despliegue)
2. El desplegable de las opciones de un archivo pierde su posicion si se activa el modo 'UltimaVersion'.
3. La estructuración de los middleware puede implementarse de una manera más óptima.

*Desarrollado exclusivamente para S.0. Windows*
