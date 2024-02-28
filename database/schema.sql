CREATE SCHEMA IF NOT EXISTS TOPICOS_DB;
USE TOPICOS_DB;

CREATE TABLE IF NOT EXISTS ARDUINO(
    id                      INT PRIMARY KEY AUTO_INCREMENT,
    ruta                    INT NOT NULL,
    numero_unidad           INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS LECTURA(
    id                      INT PRIMARY KEY AUTO_INCREMENT,
    arduino                 INT NOT NULL,
    latitud                 VARCHAR(255) NOT NULL,
    longitud                VARCHAR(255) NOT NULL,
    rotacion                VARCHAR(255) NOT NULL,
    aceleracion             VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS RUTA(
    id                      INT PRIMARY KEY AUTO_INCREMENT,
    nombre                  VARCHAR(255) NOT NULL,
    punto_inicial           VARCHAR(255) NOT NULL,
    punto_final             VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PUNTO_DE_CONTROL(
    id                      INT PRIMARY KEY AUTO_INCREMENT,
    ruta                    INT NOT NULL,
    latitud                 VARCHAR(255) NOT NULL,
    longitud                VARCHAR(255) NOT NULL
);

-- Constraints

ALTER TABLE ARDUINO ADD FOREIGN KEY (ruta) REFERENCES RUTA (id);
ALTER TABLE ARDUINO ADD UNIQUE(numero_unidad);
ALTER TABLE LECTURA ADD FOREIGN KEY (arduino) REFERENCES ARDUINO (id);
ALTER TABLE PUNTO_DE_CONTROL ADD FOREIGN KEY (ruta) REFERENCES RUTA (id);