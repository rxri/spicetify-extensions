/// <reference path="../@types/spicetify.d.ts" />

/**
 * @author CharlieS1103
 */

(function songstats() {
	const { CosmosAsync, ContextMenu, URI } = Spicetify;
	if (!(CosmosAsync && URI)) {
		setTimeout(songstats, 300);
		return;
	}
	let local_language = Spicetify.Locale._locale;
	const translation = {
		en: {
			titletxt: "Song Stats",
			buttontxt: "View Song Stats",
			danceability: "Danceability",
			energy: "Energy",
			key: "Key",
			loudness: "Loudness",
			speechiness: "Speechiness",
			acousticness: "Acousticness",
			instrumentalness: "Instrumentalness",
			liveness: "Liveness",
			valence: "Valence",
			tempo: "Tempo",
			popularity: "Popularity",
			releaseDate: "Release Date",
			label: "Record Label",
			genres: "Genres"
		},
		fr: {
			titletxt: "Statistique de la musique",
			buttontxt: "Voir les statistique de la musique",
			danceability: "Capacité à danser",
			energy: "Énergie",
			key: "Tonalité",
			loudness: "Intensité sonore",
			speechiness: "Élocution",
			acousticness: "Acoustique",
			instrumentalness: "instrumentalité",
			liveness: "vivacité",
			valence: "Mood",
			tempo: "Tempo",
			popularity: "Popularité",
			releaseDate: "Date de sortie",
			label: "Label",
			genres: "Genres"
		},
		"fr-CA": {
			titletxt: "Statistique de la musique",
			buttontxt: "Voir les statistique de la musique",
			danceability: "Capacité à danser",
			energy: "Énergie",
			key: "Tonalité",
			loudness: "Intensité sonore",
			speechiness: "Élocution",
			acousticness: "Acoustique",
			instrumentalness: "instrumentalité",
			liveness: "vivacité",
			valence: "Mood",
			tempo: "Tempo",
			popularity: "Popularité",
			releaseDate: "Date de sortie",
			label: "Label",
			genres: "Genres"
		},
		cs: {
			titletxt: "Statistiky písně",
			buttontxt: "Zobrazit statistiky písně",
			danceability: "Tančitelnost",
			energy: "Energie",
			key: "Tónina",
			loudness: "Hlasitost",
			speechiness: "Mluvenost",
			acousticness: "Akustičnost",
			instrumentalness: "Nástrojovost",
			liveness: "Živost",
			valence: "Emoční náboj",
			tempo: "Tempo",
			popularity: "Popularita",
			releaseDate: "Datum vydání",
			label: "Vydavatelství",
			genres: "Žánry"
		},
		de: {
			titletxt: "Songstatistiken",
			buttontxt: "Songstatistiken anzeigen",
			danceability: "Tanzbarkeit",
			energy: "Energie",
			key: "Tonart",
			loudness: "Lautstärke",
			speechiness: "Sprechanteil",
			acousticness: "Akustik",
			instrumentalness: "Instrumentalität",
			liveness: "Lebendigkeit",
			valence: "Stimmung",
			tempo: "Tempo",
			popularity: "Beliebtheit",
			releaseDate: "Veröffentlichungsdatum",
			label: "Plattenlabel",
			genres: "Genres"
		},
		es: {
			titletxt: "Estadísticas de la canción",
			buttontxt: "Ver estadísticas de la canción",
			danceability: "Bailable",
			energy: "Energía",
			key: "Tono",
			loudness: "Volumen",
			speechiness: "Habla",
			acousticness: "Acústica",
			instrumentalness: "Instrumental",
			liveness: "Vivacidad",
			valence: "Estado de ánimo",
			tempo: "Tempo",
			popularity: "Popularidad",
			releaseDate: "Fecha de lanzamiento",
			label: "Sello discográfico",
			genres: "Géneros"
		},
	};

	try {
		translation[local_language].buttontxt;
	} catch {
		local_language = "en";
	}

	const titletxt = translation[local_language].titletxt;
	const buttontxt = translation[local_language].buttontxt;
	const danceability = translation[local_language].danceability;
	const energy = translation[local_language].energy;
	const key = translation[local_language].key;
	const loudness = translation[local_language].loudness;
	const speechiness = translation[local_language].speechiness;
	const acousticness = translation[local_language].acousticness;
	const instrumentalness = translation[local_language].instrumentalness;
	const liveness = translation[local_language].liveness;
	const valence = translation[local_language].valence;
	const tempo = translation[local_language].tempo;
	const popularity = translation[local_language].popularity;
	const releaseDate = translation[local_language].releaseDate;
	const label = translation[local_language].label;
	const genres = translation[local_language].genres;

	//Watch for when the song is changed

	async function getSongStats(uris) {
		const uri = uris[0];
		const uriFinal = uri.split(":")[2];
		const res = await CosmosAsync.get(`https://api.spotify.com/v1/audio-features/${uriFinal}`);
		const resTrack = await CosmosAsync.get(`https://api.spotify.com/v1/tracks/${uriFinal}`);
		
		// Fetch artist data to get genres
		const artistId = resTrack.artists[0].id;
		const resArtist = await CosmosAsync.get(`https://api.spotify.com/v1/artists/${artistId}`);
		
		// Fetch full album details to get label
		const albumId = resTrack.album.id;
		const resAlbum = await CosmosAsync.get(`https://api.spotify.com/v1/albums/${albumId}`);

		const pitchClasses = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];

		let keyText = res.key;
		if (res.key === -1) {
			keyText = "Undefined";
		} else {
			const pitchClassIndex = res.key;
			keyText = pitchClasses[pitchClassIndex];
		}

		// Get the label from album data
		const labelName = resAlbum.label || "Unknown";
		
		// Get genres from artist data
		const genresList = resArtist.genres || [];
		const genresText = genresList.length > 0 ? 
			genresList.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)).join(", ") : 
			"Unknown";

		Spicetify.PopupModal.display({
			title: `${titletxt}`,
			content: `<style>
                    .stats-table {
                        display: table;
                        width: 100%;
                        border-collapse: collapse;
                        background: var(--spice-background);
                    }

                    .stats-row {
                        display: table-row;
                    }

                    .main-type-alto {
                      color: var(--spice-text);
                    }

                    .stats-cell {
                        display: table-cell;
                        padding: 2px;
                        font-weight: 550;
                        color: var(--spice-text);
                    }
                    .stats-cell:nth-child(even) {
                      font-weight: 400;
                </style>
                <div class="stats-table">
                    <div class="stats-row">
                        <div class="stats-cell">${danceability}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.danceability)}&nbsp;%</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${energy}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.energy)}&nbsp;%</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${key}:&nbsp;</div>
                        <div class="stats-cell">${keyText}</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${loudness}:&nbsp;</div>
                        <div class="stats-cell">${res.loudness}&nbsp;dB</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${speechiness}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.speechiness)}&nbsp;%</div>

                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${acousticness}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.acousticness)}&nbsp;%</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${instrumentalness}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.instrumentalness)}&nbsp;%</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${liveness}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.liveness)}&nbsp;%</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${valence}:&nbsp;</div>
                        <div class="stats-cell">${Math.round(100 * res.valence)}&nbsp;%</div>
                        </div>
                    <div class="stats-row">
                        <div class="stats-cell">${tempo}:&nbsp;</div>
                        <div class="stats-cell">${res.tempo} BPM</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${popularity}:&nbsp;</div>
                        <div class="stats-cell">${resTrack.popularity}&nbsp;%</div>
                        </div>
                    <div class="stats-row">
                        <div class="stats-cell">${releaseDate}:&nbsp;</div>
                        <div class="stats-cell">${resTrack.album.release_date}</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${label}:&nbsp;</div>
                        <div class="stats-cell">${labelName}</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${genres}:&nbsp;</div>
                        <div class="stats-cell">${genresText}</div>
                    </div>
                </div>`,
		});
	}

	const shouldDisplayContextMenu = (uris) => {
		if (uris.length > 1) return false;
		const uri = uris[0];
		const uriObj = Spicetify.URI.fromString(uri);
		if (uriObj.type === Spicetify.URI.Type.TRACK) return true;
		return false;
	}

	const statsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="main-contextMenu-menuItemIcon">
		<path d="M18 20V10"></path>
		<path d="M12 20V4"></path>
		<path d="M6 20v-6"></path>
	</svg>`;

	const cntxMenu = new ContextMenu.Item(
		buttontxt,
		getSongStats, 
		shouldDisplayContextMenu,
		statsIcon
	);
	cntxMenu.register();
})();
