#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/wait.h>
#include <signal.h>
#include <fcntl.h>

void main(){

   FILE *file;
    char line[1024];
    int pid, size;
    char process_name[256], call[8];
    long timestamp;

    char command[] = "sudo stap script.stp";
    file = popen(command, "r");

    if (file == NULL) {
        perror("Error opening file");
         exit(1) ;
    }

    while (fgets(line, sizeof(line), file)) {
        printf("---%s",line);
    }

    pclose(file);
    exit(0) ;
}
