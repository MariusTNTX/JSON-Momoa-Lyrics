# JSON-Momoa-Lyrics
Comparativa de Letras de Canciones en formato JSON.

## Pasos para añadir nuevas letras de álbumes

1) Buscar el álbum en `http://www.darklyrics.com/index.html`.
2) Copiar el contenido desde el nombre de la banda hasta el último verso de la última canción.
3) Dirigirse a la página y clicar en `Añadir Prompt al Portapapeles` (permitir la acción).
4) Pegar el contenido en ChatGPT, seleccionar la opción `Razona` y lanzar la petición.
5) Cuando termine la generación crear un archivo .json dentro de `JSON/` con el nombre de la banda, el álbum y el año según el formato `Banda -- Álbum -- año.json`.
6) Incluir el nombre completo del archivo en `available-songs.json`.
7) Hacer commit y push para desplegar en producción.