# JSON-Momoa-Lyrics
Comparativa de Letras de Canciones en formato JSON

## Pasos para añadir nuevas letras de álbumes

1) Añadir el prompt de prompt.txt en chatgpt SIN LANZARLO y seleccionar la opción "Razona" (SIN LANZARLO TODAVÍA).
1) Buscar el álbum en http://www.darklyrics.com/index.html y verificar que se visualiza la letra de todas las canciones
2) Abrir Herramientas para Desarrolladores. Se pude hacer de 3 maneras:
   - Pulsar F12
   - Botón derecho > Inspeccionar
   - Opciones del navegador (arriba a la derecha) > Más Herramientas > Herramientas para Desarrolladores
3) Ir a la pestaña Elementos o Elements
4) Dentro buscar `<div class="lyrics">`, hacer clic derecho sobre él > Copy > Copy Element
5) Pegar el contenido en chatgpt debajo del prompt y lanzarlo
6) Crear un archivo .json dentro de la carpeta JSON con el nombre de la banda, el álbum y el año según el formato `banda - álbum - año.json`