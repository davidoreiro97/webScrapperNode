import puppeteer from "puppeteer";
import { timeout } from "./delay.js";
export const scrollDown = async (pagina) => {
	//Funcion para scrollear hasta el final de la página de a 900px cada 2s.
	const distance = 450; // Distancia de desplazamiento en px.
	const delay = 1000; // Espera en ms antes de deplazarnos de nuevo.
	//Scrollea hasta el final de la página al principio, fijarse que no de problemas.
	await timeout(delay);
	const initialHeight = await pagina.evaluate("document.body.scrollHeight");
	await pagina.evaluate(`window.scrollTo(0, ${distance});`);
	await timeout(delay); // Delay para esperar carga de contenido del infinte scroll.
	let previousHeight = initialHeight;
	while (true) {
		await pagina.evaluate(`window.scrollBy(0,${distance});`);
		await timeout(delay);
		let newHeight = await pagina.evaluate("document.body.scrollHeight");
		if (newHeight === previousHeight) {
			break;
		}
		previousHeight = newHeight;
	}
};
