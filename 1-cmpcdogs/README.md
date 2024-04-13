# Parte 1 - APP Back y Front, levantar las APPS

## Docker
Para levantar el proyecto, nada más basta copiar y reenombrar el archivo `.env.example` en `.env` y tomará las variables, bastaría con un entrar al link según los endpoints expuestos

* Por defecto:
  * Back: localhost:3000
  * Front: localhost:3001


## Local
Para levantar el proyecto, es necesario tener una BD postgres levantada. Una vez la tengamos, debemos ir al archivo `app.module.ts` en back-app y modificar el campo `host` por localhost
y apuntar al puerto donde tenemos levantada nuestra BD (suele ser 5432). También habrá que instalar las dependencias del proyecto back y front (npm install en cada proyecto) y para levantar:

* Back: `npm run start:dev` - localhost:3000
* Front: `npm run dev` - localhost:8080



### Backend

Para probar el backend, se puede usar la collección `DOGS.postman_collection.json`