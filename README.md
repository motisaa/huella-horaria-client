# Huella Horaria Client(Frontend in React)

This is my final project for my higher education in Web Application Development,
made using React on the client side. Its primary function is to enable workers
to clock in and out. To achieve this, I used several libraries such as Moment.js
and Moment Timezone for proficient handling of date and time. Additionally,
Axios was utilized for facilitating the retrieval and transmission of data to
the backend. Furthermore, I incorporated the navigator API to track the location,
providing HR with the ability to monitor employee presence in the office.

You can explore the corresponding [back-end repository here](https://github.com/motisaa/huella-horaria-server)

## Huella Horaria - Guía de Configuración y Ejecución Local

## 1: Instalación de Dependencias del Cliente

1. Abrir una terminal en al directorio `huella-horaria-client`.
2. Ejecutar el siguiente comando para instalar las dependencias:

   ``` bash
   npm i
   ```

## 2: Instalación de Dependencias del Servidor

1. Abrir una terminal en al directorio `huella-horaria-server`.
2. Ejecutar el siguiente comando para instalar las dependencias:

   ``` bash
   npm i
   ```

## 3: Configuración de la Base de Datos

1. En el directorio `huella-horaria-server/sql`, existe un archivo llamado
`tablas.sql`.
2. Este archivo contiene las instrucciones para crear la base de datos y
las tablas necesarias en MySQL.
3. Es necesario importar y ejecutar el script en la aplicación correspondiente
de MySQL.

## 4: Configuración de Variables de Entorno

1. En el archivo `.env` dentro de la carpeta `huella-horaria-server`, hay que
especificar los datos de conexión de MySQL.
2. Hay que escribir los valores correctos para las variables de entorno
correspondientes.

## 5: Ejecutar la aplicación backend en Node

ejecturar el comando siguiente en el directorio `huella-horaria-server`

``` bash
   nodemon server.js 
   ```

## 6: Ejecutar la aplicación frontend en React

ejecturar el comando siguiente en el directorio `huella-horaria-client`

``` bash
   npm start
   ```


