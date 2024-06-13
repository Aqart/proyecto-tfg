# Transforstone APP

## Intalación de la Base de datos
1. Importar archivo .sql del directorio "db" en MySQL
2. Configuracion de la base de datos
    - Configuracion del archivo .env en la ruta principal
        ```php
        DB_HOST=localhost
        DB_PORT=3306
        DB_USER=user
        DB_PASSWORD=password
        DB_DATABASE=transforstone
        JWT_SECRET=ClaveSecretaParaProyectoTransform12!
        ```

## Guía de instalación

### Servidor

1. Instalación de dependencias (Estando en la ruta principal del proyecto)
    ```sh
        npm install
    ```
2. Ejecución
    ```sh
        npm start
    ``` 

### Cliente

1. Acceso al directorio e instalación de dependencias
    ```sh
        cd vue-proyecto-tfg && npm install
    ```
2. Ejecución
    ```sh
        npm run dev
    ``` 

