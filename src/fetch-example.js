async function fetchExample(search) {
	// try versucht den code innerhalb auszufühen
	try {
		const response = await fetch(`http://localhost:8000/?search=${search}`);
		// response gibt u.a eine status code zurück, z.b 200 oder 404, sowie einen boolean ok.
		// Und wenn der server down ist, gibt es kein response. Dann erhalten wir einen uncaught error, womit der script an der Stelle abgebrochen wird.
		// Wir fangen zuerst den potenziellen uncaught error auf:

		/* response.ok ist true, wenn die Antwort einen "guten" Statuscode hat,
	z.B. 200. Beim Statuscode 404 ("nicht gefunden") wäre ok false, aber
	das würde keine Error erzeugen, da die Anfrage ja korrekt funktioniert
	hat, auch wenn mir die Antwort nicht gefällt. D.h. hier müssen wir
	selbst auf einen guten Statuscode (der die gewünschten Daten liefert)
	prüfen und dann selbst einen Fehler werfen. Die Zeilen nach if werden
	dann nicht mehr ausgeführt, und JavaScript spingt in den catch-Block. */

		if (!response.ok) {
			throw new Error('Fehler beim Laden der Daten!');
		}
		const jsonData = await response.json();
		console.log(jsonData);
		// Wenn try einen Fehler ausgibt, geht's weiter mit dem code in catch
	} catch (error) {
		/* Hier solle nicht nur in der Konsole etwas ausgegeben werden, sondern
  	es sollte z.B. den Usern angezeigt werden, dass etwas mit der Anfrage
  	schief ging. */
		console.log(error);
	}

	console.log("Weiter geht's!");
}

fetchExample('102');
