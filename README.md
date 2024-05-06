# Topicos-backend

1. Crear un archivo de variables de entorno `.env` en la carpeta raíz del proyecto, una vez hecho esto crear las siguientes variables de entorno: `DB_PASSWORD`, `DB_NAME`, `DB_USER`, `DB_PORT`, `DB_HOST`, `DB_DIALECT`, `NODE_ENV`. El nombre de la base de datos debe de ser `TOPICOS_DB`, el valor de `NODE_ENV` debe ser `development` en caso de que se vaya a ejecutar el proyecto en local.
2. Ejecutar el comando `npm install`.
3. Ejecutar los test con `npm run test` (solo si ya se tiene el esquema de base de datos creado).

# Esquema de base de datos

En `database/schema.sql` esta la definción del esquema de base de datos. Este debe de ser ejecutado manualmente para crear el la base de datos localmente.

Además, debe de ejecutar el archivo `seeder.sql` que se encuentra en la misma carpeta `database` para poblar las tablas `RUTA` y `ARDUINO`.

# Uso de swagger

Para acceder a la documentación de los endpoints vaya a la siguiente dirección:

```bash
localhost:3000/doc
```
