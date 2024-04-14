# Utiliza una imagen base de Node.js
FROM node:21

# Información sobre el creador de la imagen
LABEL maintainer="felipe.karavaka@gmail.com"

# Instala MariaDB
RUN apt-get update && \
    apt-get install -y mariadb-server mariadb-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expone el puerto de MariaDB
EXPOSE 3306

# Establece el directorio de trabajo en el contenedor
WORKDIR /src

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de desarrollo
#RUN rm -rf node_modules package-lock.json


RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY ./src ./src

# Comando por defecto para iniciar tu aplicación
CMD ["npm", "start"]
