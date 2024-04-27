CREATE  database so2
use so2

drop table procesos 
create table procesos(
	id integer auto_increment primary key ,
    pid INT NOT NULL,
    nombre_proceso VARCHAR(255) NOT NULL,
    llamada VARCHAR(255) NOT NULL,
    tamanio INT NOT NULL,
    fecha DATETIME
);

DELIMITER //

CREATE PROCEDURE insertar_proceso(
    IN pid_in INT,
    IN nombre_proceso_in VARCHAR(255),
    IN llamada_in VARCHAR(255),
    IN tamanio_in INT,
    IN fecha_in VARCHAR(50)
)
BEGIN
    DECLARE fecha_convertida DATETIME;

    -- Convertir la cadena de fecha al formato de MySQL
    SET fecha_convertida = STR_TO_DATE(fecha_in, '%a %b %d %H:%i:%s %Y');

    -- Insertar el proceso con la fecha convertida
    INSERT INTO procesos (pid, nombre_proceso, llamada, tamanio, fecha) 
    VALUES (pid_in, nombre_proceso_in, llamada_in, tamanio_in, fecha_convertida);
END 

DELIMITER ;

CALL insertar_proceso(123, 'Ejemplo', 'mmap', 1024, 'Sat Apr 27 16:41:32 2024');

SELECt * from procesos