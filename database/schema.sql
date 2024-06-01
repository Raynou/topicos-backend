CREATE SCHEMA IF NOT EXISTS TOPICOS_DB;
USE TOPICOS_DB;

-- Nombre de la tabla: ARDUINO
-- Descripción: Almacena los arduinos asociados a un camión
-- FKs: ruta (RUTA)
CREATE TABLE IF NOT EXISTS ARDUINO(
    id                          INT PRIMARY KEY AUTO_INCREMENT,   -- Id del arduino
    ruta                        INT NOT NULL,                     -- Id de la ruta asociada
    numero_unidad               INT NOT NULL                      -- Número de unidad del camión
);

-- Nombre de la tabla: LECTURA
-- FKs: arduino (ARDUINO)
CREATE TABLE IF NOT EXISTS LECTURA(
    id                          INT PRIMARY KEY AUTO_INCREMENT,   -- Id de la lectura
    arduino                     INT NOT NULL,                     -- Id del arduino asociado
    latitud                     VARCHAR(255) NOT NULL,            -- Latitud de la lectura
    longitud                    VARCHAR(255) NOT NULL,            -- Longitud de la lectura
    fecha                       DATETIME NOT NULL                 -- Fecha de la lectura, incluye hora, minuto y segundo
);

-- Nombre de la tabla: RUTA
-- Descripción: Almacena las rutas de un camión
-- FKs: arduino (ARDUINO)
CREATE TABLE IF NOT EXISTS RUTA(
    id                          INT PRIMARY KEY AUTO_INCREMENT,   -- Id de la ruta
    nombre                      VARCHAR(255) NOT NULL,            -- Nombre de la ruta
    umbral                      VARCHAR(255) NOT NULL             -- Umbral de la ruta, representa la ditancia mínima para calcular rebasos
);

-- Nombre de la tabla: PUNTO_DE_CONTROL
-- Descripción: Almacena los puntos de control de una ruta
-- FKs: ruta (RUTA)
CREATE TABLE IF NOT EXISTS PUNTO_DE_CONTROL(
    id                          INT PRIMARY KEY AUTO_INCREMENT,   -- Id del punto de control
    ruta                        INT NOT NULL,                     -- Id de la ruta asociada
    latitud                     VARCHAR(255) NOT NULL,            -- Latitud del punto de control
    longitud                    VARCHAR(255) NOT NULL,            -- Longitud del punto de control
    tipo                        ENUM('INICIO', 'NORMAL') NOT NULL, -- Tipo del punto de control, solo puede haber un inicio por ruta
    posicion                    INT NOT NULL,                     -- La posción del punto de control en la ruta
    tiempo_esperado             VARCHAR(255) NOT NULL             -- La cantidad esperada de tiempo en el que el autbús debe pasar por el punto de control
);

-- Nombre de la tabla: VUELTA
-- Descripción: Almacena las vueltas dadas por un camión
-- FKs: arduino (ARDUINO)
CREATE TABLE IF NOT EXISTS VUELTA(
    id                          INT PRIMARY KEY AUTO_INCREMENT,    -- Id de la vuelta
    arduino                     INT NOT NULL,                      -- Id del arduino asociado al camión
    fecha                       DATETIME NOT NULL                  -- Fecha de la vuelta, incluye hora, minuto y segundo
);

-- Nombre de la tabla: TIEMPO
-- Descripción: Almacena los tiempos hechos por un camión en una vuelta
-- FKs: vuelda (VUELTA)
CREATE TABLE IF NOT EXISTS TIEMPO(
    id                          INT PRIMARY KEY AUTO_INCREMENT,   -- La id del tiempo
    vuelta                      INT NOT NULL,                     -- La vuelta asociada
    fecha                       DATETIME NOT NULL,                -- La fecha del tiempo, incluye hora, minuto y segundo
    tiempo                      VARCHAR(255) NOT NULL             -- El tiempo, capturado en VARCHAR para mejor precisión
);

-- Restricciones

ALTER TABLE ARDUINO ADD FOREIGN KEY (ruta) REFERENCES RUTA (id);
ALTER TABLE ARDUINO ADD UNIQUE(numero_unidad);
ALTER TABLE LECTURA ADD FOREIGN KEY (arduino) REFERENCES ARDUINO (id);
ALTER TABLE PUNTO_DE_CONTROL ADD FOREIGN KEY (ruta) REFERENCES RUTA (id);
ALTER TABLE VUELTA ADD FOREIGN KEY (arduino) REFERENCES ARDUINO (id);
ALTER TABLE TIEMPO ADD FOREIGN KEY (vuelta) REFERENCES VUELTA (id);

-- Documentación

-- ARDUINO
ALTER TABLE ARDUINO COMMENT 'Almacena los arduinos asociados a un camión';
ALTER TABLE ARDUINO MODIFY COLUMN id INT COMMENT 'Id del arduino';
ALTER TABLE ARDUINO MODIFY COLUMN ruta INT NOT NULL COMMENT 'Id de la ruta asociada';
ALTER TABLE ARDUINO MODIFY COLUMN numero_unidad INT NOT NULL COMMENT 'Número de unidad del camión';

-- LECTURA
ALTER TABLE LECTURA COMMENT 'Almacena las lecturas de un arduino';
ALTER TABLE LECTURA MODIFY COLUMN id INT COMMENT 'Id de la lectura';
ALTER TABLE LECTURA MODIFY COLUMN arduino INT NOT NULL COMMENT 'Id del arduino asociado';
ALTER TABLE LECTURA MODIFY COLUMN latitud VARCHAR(255) NOT NULL COMMENT 'Latitud de la lectura';
ALTER TABLE LECTURA MODIFY COLUMN longitud VARCHAR(255) NOT NULL COMMENT 'Longitud de la lectura';
ALTER TABLE LECTURA MODIFY COLUMN fecha DATETIME NOT NULL COMMENT 'Fecha de la lectura, incluye hora, minuto y segundo';

-- RUTA
ALTER TABLE RUTA COMMENT 'Almacena las rutas de un camión';
ALTER TABLE RUTA MODIFY COLUMN id INT COMMENT 'Id de la ruta';
ALTER TABLE RUTA MODIFY COLUMN nombre VARCHAR(255) NOT NULL COMMENT 'Nombre de la ruta';
ALTER TABLE RUTA MODIFY COLUMN umbral VARCHAR(255) NOT NULL COMMENT 'Umbral de la ruta, representa la ditancia mínima para calcular rebasos';

-- PUNTO_DE_CONTROL
ALTER TABLE PUNTO_DE_CONTROL COMMENT 'Almacena los puntos de control de una ruta';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN id INT COMMENT 'Id del punto de control';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN ruta INT NOT NULL COMMENT 'Id de la ruta asociada';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN latitud VARCHAR(255) NOT NULL COMMENT 'Latitud del punto de control';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN longitud VARCHAR(255) NOT NULL COMMENT 'Longitud del punto de control';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN tipo ENUM('INICIO', 'NORMAL') NOT NULL COMMENT 'Tipo del punto de control, solo puede haber un inicio por ruta';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN posicion INT NOT NULL COMMENT 'La posción del punto de control en la ruta';
ALTER TABLE PUNTO_DE_CONTROL MODIFY COLUMN tiempo_esperado VARCHAR(255) NOT NULL COMMENT 'La cantidad esperada de tiempo en el que el autbús debe pasar por el punto de control';

-- VUELTA
ALTER TABLE VUELTA COMMENT 'Almacena las vueltas dadas por un camión';
ALTER TABLE VUELTA MODIFY COLUMN id INT COMMENT 'Id de la vuelta';
ALTER TABLE VUELTA MODIFY COLUMN arduino INT NOT NULL COMMENT 'Id del arduino asociado al camión';
ALTER TABLE VUELTA MODIFY COLUMN fecha DATE NOT NULL COMMENT 'Fecha de la vuelta';

-- TIEMPO
ALTER TABLE TIEMPO COMMENT 'Almacena los tiempos hechos por un camión en una vuelta';
ALTER TABLE TIEMPO MODIFY COLUMN id INT COMMENT 'Id de la lectura de tiempo';
ALTER TABLE TIEMPO MODIFY COLUMN vuelta INT NOT NULL COMMENT 'Id de la vuelta asociada';
ALTER TABLE TIEMPO MODIFY COLUMN fecha DATE NOT NULL COMMENT 'Fecha del, incluye hora, minuto y segundo';
ALTER TABLE TIEMPO MODIFY COLUMN tiempo VARCHAR(255) NOT NULL COMMENT 'La cantidad de tiempo tomada, en varchar para mejorar precisión';

-- Sí es la primera vez que se crea el schema, no es necesario ejecutar estas queries

-- Añadir tiempo a PUNTO_DE_CONTROL
-- ALTER TABLE PUNTO_DE_CONTROL ADD COLUMN tiempo VARCHAR(255) NOT NULL;

-- Añadir umbral a RUTA
-- ALTER TABLE RUTA ADD COLUMN umbral VARCHAR(255) NOT NULL;

-- Añadir tipo a RUTA
-- ALTER TABLE RUTA ADD COLUMN tipo ENUM('INCIO', 'NORMAL', 'FINAL') NOT NULL;

-- Añadir fecha a VUELTA
-- ALTER TABLE VUELTA ADD COLUMN fecha DATETIME NOT NULL;

-- Añadir fecha a LECUTRA
-- ALTER TABLE LECTURA ADD COLUMN fecha DATETIME NOT NULL;

-- Añadir fecha a TIEMPO
-- ALTER TABLE TIEMPO ADD COLUMN fecha DATETIME NOT NULL;

-- Change the name of tiempo to tiempo_esperado in PUNTO_DE_CONTROL
-- ALTER TABLE PUNTO_DE_CONTROL CHANGE COLUMN tiempo tiempo_esperado VARCHAR(255) NOT NULL;

-- Remove ROTACION and ACELERACION from LECTURA
-- ALTER TABLE LECTURA DROP COLUMN rotacion;
-- ALTER TABLE LECTURA DROP COLUMN aceleracion;

-- Add posicion to PUNTO_DE_CONTROL
-- ALTER TABLE PUNTO_DE_CONTROL ADD COLUMN posicion INT NOT NULL;
