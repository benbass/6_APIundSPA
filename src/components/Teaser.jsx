import { imageBase } from '../movieDb';
import { Link, useLocation } from 'wouter';

export default function Teaser({
	title,
	original_title,
	poster_path,
	release_date,
	id,
}) {
	const [, setLocation] = useLocation(); // Wir brauchen den ersten Item des Arrays (location) nicht.
	const posterUrl = poster_path ? `${imageBase}/w342/${poster_path}` : '';

	/* In year soll nur das Jahr aus release_date gespeichert werden: */
	const year = new Date(release_date).getFullYear(); // oder: release_date.substring(0, 4);
	const linkTarget = `/movie/${id}`;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<article className="teaser" onClick={() => setLocation(linkTarget)}>
			<header className="teaser__header">
				<h3 className="teaser__title">
					{/* Hier um den Textinhalt einen Link mit Ziel /movie/id einfügen */}
					<Link to={linkTarget}>
						{title} {year && <time dateTime={year}>({year})</time>}
					</Link>
				</h3>
				{/* Originaltitel nur anzeigen, wenn er vom Titel abweicht */}
				<em className="teaser__original-title">
					{original_title !== title && original_title}
				</em>
			</header>

			<div className="teaser__poster">
				{!posterUrl && (
					<div className="teaser__poster__placeholder" aria-hidden="true">
						🎞️
					</div>
				)}
				{posterUrl && <img src={posterUrl} alt={`Filmplakat ${title}`} />}
			</div>
		</article>
	);
}
