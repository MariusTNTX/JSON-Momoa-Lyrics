const PROMPT = 
`Te voy a pasar el contenido de una página de lyrics con las letras de las canciones de un álbum en su idioma original. 
Primero se mostrará el nombre de la banda en mayúsculas terminado en "LYRICS", después el álbum seguido del año, después los nombres de las canciones y finalmente la letra de cada canción.
Me gustaría que me devolvieras las canciones en formato JSON como un array de canciones, donde cada canción será un objeto con las siguientes propiedades:

- 1) title: Un objeto con las propiedades:
   - 1.1) original: Contiene el título original de la canción (sin el número).
   - 1.2) spanish: Contiene el título de la canción traducido al español (sin el número).
- 2) credits: El texto contenido entre corchetes al final de cada canción (si existe). Para que te sea fácil identificarlo suele contener información relativa a "music" y/o "lyrics".
- 3) sections: Un array de secciones/párrafos. Cada sección se corresponderá con un párrafo de la letra de la canción, excepto que ésta sea instrumental (suele aparecer como "[instrumental]"), en cuyo caso el array quedará vacío y la propiedad siguiente tendrá el valor TRUE. Así, cada sección/párrafo será un array de: 
   - 3.1) lines: Cada line será un objeto que contendrá un verso/línea de una sección/párrafo de la canción. Por tanto, cada línea tendrá las propiedades:
      - 3.1.1) original: Contiene el verso o línea original de la letra.
      - 3.1.2) spanish: Contiene el verso o línea traducida al español castellano.
- 4) isInstrumental: Un booleano que sea TRUE cuando la canción sea instrumental según lo especificado en el apartado 3.

Ejemplo de estructura JSON: 
[
	{ /* SONG */
		"title": {
			"original": "Deep",
			"spanish": "Profundo"
		},
		"credits": "[Lyrics: V. Cavanagh, Music: D. Cavanagh & D. Pybus]",
		"sections": [
			[ /* SECTION */
				{ /* LINE */
					"original": "Feel my heart burning",
					"spanish": "Siente mi corazón ardiendo"
				},
				{ /* LINE */
					"original": "Deep inside... yearning",
					"spanish": "En lo profundo... anhelando"
				}, ...
			],
			[ /* SECTION */
				{ /* LINE */
					"original": "A fettered heart, waking",
					"spanish": "Un corazón encadenado, despertando"
				},
				{ /* LINE */
					"original": "Tainted youth, fading",
					"spanish": "Juventud manchada, desvaneciéndose"
				}, ...
			], ...
		], ...
	}, ...
];

Más instrucciones importantes: 
- Procura realizar traducciones que tengan sentido en castellano para un español promedio en vez de traducir literalmente del inglés. 
- Debes adaptarte al contexto de la canción, y para ello es importante que realices la traducción de cada linea teniendo en cuenta las demás líneas de la canción.
- Devuelve únicamente el JSON dentro de una ventana de código JSON para que pueda copiarlo con un click.

CONTENIDO DE LA PÁGINA:`;

async function addPromptToClipboard() {
  try {
    const clipboardText = await navigator.clipboard.readText();
    const finalPrompt = PROMPT + "\n\n" + clipboardText;
    await navigator.clipboard.writeText(finalPrompt);
  } catch (err) {
    alert("Error accediendo al portapapeles");
    console.error("Error accediendo al portapapeles:", err);
  }
}