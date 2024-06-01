USE TOPICOS_DB;
-- Los datos insertados en este fichero son meramente representativos y pueden
-- estar sujetos a cambios

-- Clear all data
START TRANSACTION;
    DELETE FROM TIEMPO;
    DELETE FROM VUELTA;
    DELETE FROM ARDUINO;
    DELETE FROM PUNTO_DE_CONTROL;
    DELETE FROM RUTA;
COMMIT;

-- Basic data
START TRANSACTION;
    INSERT INTO RUTA (nombre, umbral) VALUES ('Ruta 1', 1);
    INSERT INTO PUNTO_DE_CONTROL (ruta, latitud, longitud, tipo, posicion, tiempo_esperado) VALUES (1, '19.4326', '-99.1332', 'INICIO', 1, '00:00:00');
    INSERT INTO PUNTO_DE_CONTROL (ruta, latitud, longitud, tipo, posicion, tiempo_esperado) VALUES (1, '26.4326', '-94.1112', 'NORMAL', 2, '00:00:00');
    INSERT INTO PUNTO_DE_CONTROL (ruta, latitud, longitud, tipo, posicion, tiempo_esperado) VALUES (1, '29.4326', '-92.1112', 'NORMAL', 3, '00:00:00');
    INSERT INTO ARDUINO (ruta, numero_unidad) VALUES (1, 1);
    INSERT INTO ARDUINO (ruta, numero_unidad) VALUES (1, 2);
COMMIT;

-- Data for test the laps module
START TRANSACTION;
    -- First lap for unit 1
    INSERT INTO VUELTA (arduino, fecha) VALUES (1, '2021-06-01 10:00:00');
    -- Times for the first lap of unit 1
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (1, '2021-06-01 10:00:00', '34880');
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (1, '2021-06-01 10:05:00', '34880');
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (1, '2021-06-01 10:10:00', '34880');

    -- Second lap for unit 1
    INSERT INTO VUELTA (arduino, fecha) VALUES (1, '2021-06-01 10:20:00');
    -- Times for the second lap of unit 1
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (2, '2021-06-01 10:20:00', '1000000');
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (2, '2021-06-01 10:25:00', '21321321');
    INSERT INTO TIEMPO (vuelta, fecha, tiempo) VALUES (2, '2021-06-01 10:30:00', '119312123');
COMMIT;

-- Readings
START TRANSACTION;
    INSERT INTO LECTURA (arduino, latitud, longitud, fecha) VALUES (1, '19.4326', '-99.1332', '2021-06-01 10:00:00');
    INSERT INTO LECTURA (arduino, latitud, longitud, fecha) VALUES (1, '19.4326', '-99.1332', '2021-06-01 10:01:00');
    INSERT INTO LECTURA (arduino, latitud, longitud, fecha) VALUES (1, '19.4326', '-99.1332', '2021-06-01 10:02:00');
    INSERT INTO LECTURA (arduino, latitud, longitud, fecha) VALUES (1, '19.4326', '-99.1332', '2021-06-01 10:03:00');
COMMIT;

-- En caso de error descomente y ejecute la línea inferior 
-- ROLLBACK;