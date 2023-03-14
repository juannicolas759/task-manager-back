### Features

- Este repositorio contiene el backend para una aplicacion de manejo de tareas, enfocada en replicar el manjo de tareas en tableros Kanban donde las tareas tienen barios estados.
- La API junto con la base de datos permite guardar un registro de los movimientos que tiene una tarea por cada uno de los estados o las secciones comprendidas en un tablero

# Task Manager

Primero hay que instalar nodejs  https://nodejs.org/es/download/

Para correr el proyecto ejecutar los siguientes comandos y pasos, posteriormente a la clonación del repositorio.


Dentro de la carpeta task-manager-back
```
npm i
```
En la el archivo ubicado en /prisma/schema.prisma reemplazar la url por una conexión a base de datos con el siguiente formato
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```
Exporte el modelo de base de datos desde el archivo schema.prisma a la base de datos que se especifico en el paso anterior con el siguiente comando

```
npx prisma db push
```
Generar el cliente de prisma 
```
npx prisma generate
```
Ejecutar el programa con
```
node src/index.js
```
Para finalizar la ejecucion del programa con
```
ctrl+c
```

