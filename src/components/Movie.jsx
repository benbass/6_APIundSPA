import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ColorRing } from 'react-loader-spinner';
import { fetchMovieDb } from '../movieDb';

export default function Movie({ params }) {
	// (params wird als props von Wouter übergeben. Wir haben einen parameter "id" in der Route genannt, so dass hie auch id ankommt)
	const { id } = params;
	const [movieData, setMovieData] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	/* Hier die Filmdaten laden und in movieData speichern.
	https://developers.themoviedb.org/3/movies/get-movie-details
	*/
	useEffect(() => {
		async function fetchMovie() {
			try {
				const { data } = await fetchMovieDb(`/movie/${id}`);
				setMovieData(data);
			} catch (error) {
				console.log(error);
				setErrorMessage('Fehler beim Laden der Filmdaten!');
			}
		}
		fetchMovie();
	}, [id]);

	if (errorMessage) {
		return <strong>{errorMessage}</strong>;
	}

	if (!movieData) {
		return (
			<ColorRing
				visible={true}
				height="80"
				width="80"
				ariaLabel="blocks-loading"
				wrapperStyle={{}}
				wrapperClass="spinner"
				colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
			/>
		);
	}

	const { title, original_title, overview, release_date, runtime, genres } =
		movieData;

	const date = release_date
		? new Date(release_date).toLocaleDateString('de-DE')
		: '';

	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<article className="movie">
				<h1 className="movie__title">{title}</h1>
				{title !== original_title && (
					<em className="movie__original-title">{original_title}</em>
				)}
				{overview && <p className="movie__overview">{overview}</p>}
				<h2>Details</h2>
				<dl className="movie__details">
					{date && (
						<>
							<dt>Datum</dt>
							<dd>{date}</dd>
						</>
					)}
					<dt>Dauer</dt>
					<dd>{runtime} Min.</dd>
					{genres.length > 0 && (
						<>
							<dt>{genres.length > 1 ? 'Genres' : 'Genre'}</dt>
							<dd>{genres.map(({ name }) => name).join(', ')}</dd>
						</>
					)}
				</dl>
			</article>
		</>
	);
}

/* 

Hinweise: 
- Originaltitel nur anzeigen, wenn er vom deutschen Titel abweicht

- Overview nur anzeigen, wenn vorhanden.

- Falls Erscheinungsdatum vorhanden, das Datum anzeigen.
Bonus: Datum mit Hilfe der toLocaleDateString-Methode des Date-Objekts
im deutschen Format anzeigen:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

- Genres als kommagetrennten String anzeigen, hier können zwei
Array-Methoden mit chaining verbunden und genutzt werden.
Je nachdem, ob es ein oder mehrere Genres gibt, soll in dt Genre oder
Genres stehen.

Bonus: Nutzt Helmet, um den Filmtitel als Seitentitel darzustellen

Bonus: Stellt statt dem article-Element mit den Filmdaten eine Ladeanzeige 
   von https://mhnpd.github.io/react-loader-spinner/ dar, bis die Filmdaten 
   geladen sind. 

   
Infos zum HTML-Element dl (description list):
https://www.mediaevent.de/xhtml/dl.html
http://html5doctor.com/the-dl-element/ 

*/
