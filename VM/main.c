#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/wait.h>
#include <signal.h>
#include <fcntl.h>
#include <mysql/mysql.h>

void main(){

    MYSQL *conn;
	MYSQL_RES *res;
	MYSQL_ROW row;
	
	char* server = "database-so2.c58sy6swwbbw.us-east-2.rds.amazonaws.com";
	char* user = "admin";
	char* password = "d4d202a70b";
	char* database = "so2";
	
	conn = mysql_init(NULL);	

	if (!mysql_real_connect(conn, server, user, password, 
                                      database, 0, NULL, 0)) {
		fprintf(stderr, "%s\n", mysql_error(conn));
		exit(1);
	}

   FILE *file;
    char line[1024];
    char *token;
    int pid, tamanio;
    char nombre_proceso[255], llamada[255], fecha[50];

    char command[] = "sudo stap script.stp";
    file = popen(command, "r");

    if (file == NULL) {
        perror("Error opening file");
         exit(1) ;
    }

    while (fgets(line, sizeof(line), file)) {
        token = strtok(line, ",");
        pid = atoi(token);
        token = strtok(NULL, ",");
        strcpy(nombre_proceso, token);
        token = strtok(NULL, ",");
        strcpy(llamada, token);
        token = strtok(NULL, ",");
        strcpy(fecha, token);
        token = strtok(NULL, ",");
        tamanio = atoi(token);
        char query[1024];
        
        sprintf(query, "CALL so2.insertar_proceso (%d, '%s', '%s', %d, '%s')", pid, nombre_proceso, llamada, tamanio, fecha);
        if (mysql_query(conn, query)) {
            fprintf(stderr, "Error al ejecutar la consulta: %s\n", mysql_error(conn));
        }
    }

    pclose(file);
    mysql_close(conn);
    exit(0) ;
}
