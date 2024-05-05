USE TOPICOS_DB;
-- Los datos insertados en este fichero son meramente representativos y pueden
-- estar sujetos a cambios

START TRANSACTION;
    INSERT INTO RUTA (nombre, punto_inicial_lat, punto_inicial_lon, punto_final_lat, punto_final_lon) VALUES 
    ('Tampico Playa', '1.0', '1.0', '1.0', '1.0');
    INSERT INTO ARDUINO (ruta, numero_unidad) VALUES (1, 1);
COMMIT;

-- En caso de error descomente y ejecute esta línea
-- ROLLBACK;