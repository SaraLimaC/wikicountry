## Cómo probarlo

    Abre m2.html en el navegador (o con Live Server). Verás que se trata de un buscador de países que ofrece información acerca de ellos, hay una barra de búsqueda, una lista, ordenada alfabéticamente, y un mapa en la parte inferior.

## Uso de IA

    Usé Claude para conseguir una buena estética para la página, es decir para editar el css y dejar una vista limpia.

    Ejemplo de prompt: "Como puedo crear una barra de scroll para una lista dentro de un div".

    Luego agregué los nombres y las banderas de los países para poder guiar en la lista, con sus respectivos addEventListener en el id para pincharlo ahí directamente.

    Usé Copilot para poder filtrar también el inicio de los países, es decir, que no solo sea comparando el nombre entero del país, si pongo únicamente "s" en el buscador que me filtre y muestre todos los países que empiezan por "s" o el texto que sea. Además lo usé para poder escoger qué hacer con aquellos países que no tenían ciertos campos.

    Ejemplo de prompt: "Algunos países no tienen los campos que usé entonces no llegan a cargar, ¿qué solución hay?, ¿puedo cambiar los campos en esos países?".

    También usé Copilot para implementar la vista de los países o el navegador, para alternar entre la lista de países y la ficha con detalles de cada país mediante botones y los cambios de visibilidad como hidden.

    Ejemplo de prompt: "Se puede ocultar la lista y mostrar únicamente la información del país seleccionado, y también quiero que se pueda volver atrás sin recargar la página".

## Autopsia
1. Para algunos países no había información de los campos que yo pedía y mostraba, así que le añadí algunos mensajes de error cuando el campo está  vacío, pero luego lo cambié para que fuera más limpio y no impidiera mostrar el resto de campos y les di un valor por defecto, si estaban vacíos entonces se llenaba con "" y así evitaba que lanzara tantos errores.

2. Al principio tenía un buscador y solo se iba a mostrar el país introducido, no iba a añadir resultados filtrados por empezar por los mismos     caracteres, pero para que fuera más dinámico y eficiente lo cambié. Además la lista iba a estar descentrada en un borde como apoyo pero no iba a interactuar con ella, pero por la misma razón para que fuera más interactivo la centralicé y añadí los eventos para escuchar los clics y poder abrir los países desde ahí.