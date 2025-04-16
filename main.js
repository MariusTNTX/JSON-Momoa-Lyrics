document.getElementById('jsonInput').addEventListener('change', function(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  // Extraer banda, álbum y año del nombre del archivo (Formato: "Banda - Álbum - Año.json")
  const nombreArchivo = archivo.name;
  const archivoSinExt = nombreArchivo.replace(/\.json$/i, '');
  const partes = archivoSinExt.split(' - ');
  let banda = '', album = '', año = '';
  if (partes.length === 3) {
    banda = partes[0].trim();
    album = partes[1].trim();
    año = partes[2].trim();
  }

  // Mostrar la información del archivo en la página
  const fileInfoDiv = document.getElementById('fileInfo');
  fileInfoDiv.innerHTML = `<h2 class="album-info">${banda}</h2>
                           <h3 class="album-info">${album} (${año})</h3>`;

  const lector = new FileReader();
  lector.onload = function(e) {
    try {
      const canciones = JSON.parse(e.target.result);
      showSongs(canciones);
    } catch (error) {
      document.getElementById('songsContainer').innerHTML = `<p style="color:red; text-align: center;">Error al leer el JSON: ${error.message}</p>`;
    }
  };
  lector.readAsText(archivo);
});

function showSongs(canciones) {
  const container = document.getElementById('songsContainer');
  container.innerHTML = '';

  canciones.forEach(cancion => {
    // Contenedor de la canción
    const divSong = document.createElement('div');
    divSong.className = 'song';

    // Título
    const titulo = document.createElement('h2');
    titulo.className = 'song-title';
    titulo.textContent = `${cancion.title.original} / ${cancion.title.spanish}`;
    divSong.appendChild(titulo);

    // Créditos
    const creditos = document.createElement('p');
    creditos.className = 'song-credits';
    creditos.textContent = cancion.credits;
    divSong.appendChild(creditos);

    // Si la canción es instrumental o no tiene secciones
    if (cancion.isInstrumental || !cancion.sections || cancion.sections.length === 0) {
      const instrumentalMsg = document.createElement('div');
      instrumentalMsg.className = 'instrumental';
      instrumentalMsg.textContent = "Instrumental";
      divSong.appendChild(instrumentalMsg);
    } else {
      // Secciones de la canción
      cancion.sections.forEach(section => {
        const divSection = document.createElement('div');
        divSection.className = 'section';

        // Versos dentro de la sección
        section.forEach(verso => {
          const divVerse = document.createElement('div');
          divVerse.className = 'verse';

          const spanOriginal = document.createElement('span');
          spanOriginal.className = 'original';
          spanOriginal.textContent = verso.original;

          const spanSpanish = document.createElement('span');
          spanSpanish.className = 'spanish';
          spanSpanish.textContent = verso.spanish;

          divVerse.appendChild(spanOriginal);
          divVerse.appendChild(spanSpanish);
          divSection.appendChild(divVerse);
        });
        divSong.appendChild(divSection);
      });
    }
    container.appendChild(divSong);
  });
}