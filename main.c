#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/wait.h>
#include <signal.h>
#include <fcntl.h>

void main(){

    char comando[100];
        
        sprintf(comando, "sudo stap script.stp > syscalls.log");
        system(comando);
        wait(NULL);
        exit(1);
    
    
    exit(0);
}
