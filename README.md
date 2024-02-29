# Topicos-backend

1. Crear un archivo de variables de entorno `.env` en la carpeta raíz del proyecto, una vez hecho esto crear las siguientes variables de entorno: `DB_PASSWORD`, `DB_NAME`, `DB_USER`.
2. Ejecutar el comando `npm install`.
3. Ejecutar los test con `npm run test` (solo si ya se tiene el esquema de base de datos creado).

# Esquema de base de datos

En `database/schema.sql` esta la definción del esquema de base de datos. Este debe de ser ejecutado manualmente para crear el la base de datos localmente.

Además, debe de ejecutar el archivo `seeder.sql` que viene se encuentra en la misma carpeta `database` para poblar las tablas `RUTA` y `ARDUINO`.
