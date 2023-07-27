import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Ändert Seiten-Metadaten

import LocationFinder from './components/LocationFinder';
import MoviesFinder from './components/MoviesFinder';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			{/* <LocationFinder /> */}
			<MoviesFinder />
		</HelmetProvider>
	</React.StrictMode>
);
