
### UNIVERSIDAD SAN CARLOS DE GUATEMALA
FACULTAD DE INGENIERÍA  
ESCUELA DE CIENCIAS Y SISTEMAS  
LABORATORIO DE SISTEMAS OPERATIVOS 2
SECCIÓN B

|  Nombre | Carnet  |
| ------------ | ------------ |
| Jose Carlos Moreira Paz | 201701015 |
| Paula Gabriela García Reinoso | 201700823 |

# MANUAL TECNICO
## Descripcion
La gestion de memoria es un aspecto importante para todo sistema informatico. Para facilitar la tarea de llevar un control de la memoria se realizo un programa encargado de monitorear el uso de memoria de cada proceso en un sistema operativo linux, a partir de las solicitudes mmap y munmap realizadas. 

## Maquina Virtual
En esta maquina se realizo un programa en C el cual con ayuda de la herramienta de systemtap obtenia todas las solicitudes de memoria de los procesos activos, dicha maquina se conecta a una base de datos levantada en mysql donde almacena cada uno de los procesos capturados.


### Systemtap
SystemTap es una herramienta de diagnóstico y monitoreo de sistemas en entornos Linux. Dicha herramienta en este proyecto fue la encargada de monitorear los procesos para identificar la informacion necesaria y realizar las acciones respectivas.

- ### Mmap:
    Esta llamada al sistema se utiliza para asignar una región de memoria virtual dentro del espacio de direcciones de un proceso. Permite mapear un archivo existente en memoria o crear una nueva región de memoria asignada dinámicamente. Algunos de los parámetros que se pueden especificar incluyen la dirección de inicio deseada, el tamaño de la región de memoria y los permisos de acceso.

- ### Munmap
    Esta llamada al sistema se utiliza para desasignar una región de memoria virtual previamente asignada mediante mmap. Permite liberar la memoria asignada y devolverla al sistema operativo. Algunos de los parámetros que se pueden especificar incluyen la dirección de inicio de la región de memoria y el tamaño de la región a desasignar.
## DB
### Tabla
```sql
create table procesos(
	id integer auto_increment primary key ,
    pid INT NOT NULL,
    nombre_proceso VARCHAR(255) NOT NULL,
    llamada VARCHAR(255) NOT NULL,
    tamanio INT NOT NULL,
    fecha DATETIME
);
```
### Procedimiento Almacenado
```sql
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
```

## Backend

El backend fue desarrollado  en python apoyado por el framework flask. En este se obtienen todos los procesos almacenados por la maquina virtual, este a partir de unas consultas a la base de datos recibe la informacion, la filtra y la envia apartir de la herramienta socket io.

## Frontend
El frontend fue realizado en javascript react. En el se muestra toda la informacion obtenida del backend en tablas y graficas, las cuales iran cambiandp en tiempo real.

## Socket io
Socket.IO es una poderosa herramienta para crear aplicaciones web en tiempo real que requieren comunicación bidireccional entre clientes y servidores. Gracias a este es que se pueden ver los cambios en tiempo real en el frontend.
