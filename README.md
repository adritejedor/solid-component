# solid-component
Creacion de componente angular usando metodo SOLID

# Error con @ViewChild y ngAfterContentInit en el componente simple-alert-view
Al usar ViewChild, si uso ngAfterViewInit marca el error en de detección de cambios en los entornos de desarrollo.
La solución según la guía del curso es usar el metodo de ciclo de vida ngAfterContentInit en vez de ngAfterViewInit, el cambio funciona correctamente en el curso pero en mi entorno falla con el mismo procedimiento, por lo que intuyo que falla debido a la versión de angular.
Para solventar el error se esta usando actualmente ngAfterViewInit aunq muestra un error por consola.
