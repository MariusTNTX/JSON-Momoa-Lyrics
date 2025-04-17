const HOST_URL = 'https://mariustntx.github.io/JSON-Momoa-Lyrics';
const songPicker = document.getElementById('song-picker');
const fileInfoDiv = document.getElementById('fileInfo');
const songsContainer = document.getElementById('songsContainer');

function createSongPicker(availableSongs) {
  const ordenadas = availableSongs.sort((a, b) => a.localeCompare(b));

  ordenadas.forEach(filename => {
    const archivoSinExt = filename.replace(/\.json$/i, '');
    const partes = archivoSinExt.split(' -- ');
    if (partes.length !== 3) return;

    const [banda, album, año] = partes.map(p => p.trim());
    const item = document.createElement('div');
    item.className = 'song-item';
    item.textContent = `${banda} - ${album} (${año})`;

    item.addEventListener('click', () => {
      fileInfoDiv.innerHTML = `<h2 class="album-info">${banda}</h2>
                               <h3 class="album-info">${album} (${año})</h3>`;
      loadSong(filename);
    });

    songPicker.appendChild(item);
  });
}

function loadSong(filename) {
  fetch(`${HOST_URL}/JSON/${filename}`)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo.");
      return res.json();
    })
    .then(data => {
      showSongs(data);
    })
    .catch(error => {
      songsContainer.innerHTML = `<p style="color:red; text-align: center;">Error al cargar: ${error.message}</p>`;
    });
}

function showSongs(canciones) {
  songsContainer.innerHTML = '';

  canciones.forEach(cancion => {
    const divSong = document.createElement('div');
    divSong.className = 'song';

    const tituloOriginal = document.createElement('h2');
    tituloOriginal.className = 'song-title';
    tituloOriginal.textContent = `${cancion.title.original}`;
    divSong.appendChild(tituloOriginal);

    const tituloTraducido = document.createElement('h2');
    tituloTraducido.className = 'song-title song-title-spanish';
    tituloTraducido.textContent = `${cancion.title.spanish}`;
    divSong.appendChild(tituloTraducido);

    const creditos = document.createElement('p');
    creditos.className = 'song-credits';
    creditos.textContent = cancion.credits;
    divSong.appendChild(creditos);

    if (cancion.isInstrumental || !cancion.sections || cancion.sections.length === 0) {
      const instrumentalMsg = document.createElement('div');
      instrumentalMsg.className = 'instrumental';
      instrumentalMsg.textContent = "Instrumental";
      divSong.appendChild(instrumentalMsg);
    } else {
      cancion.sections.forEach(section => {
        const divSection = document.createElement('div');
        divSection.className = 'section';

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

    songsContainer.appendChild(divSong);
  });
}

fetch(`${HOST_URL}/available-songs.json`)
  .then(res => {
    if (!res.ok) throw new Error("No se encontraron canciones disponibles.");
    return res.json();
  })
  .then(data => {
    createSongPicker(data);
  })
  .catch(error => {
    console.error(error);
    songsContainer.innerHTML = `<p style="color:red; text-align: center;">Error al cargar: ${error.message}</p>`;
  });