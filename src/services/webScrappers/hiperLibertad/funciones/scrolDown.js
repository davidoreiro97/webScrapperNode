import puppeteer from "puppeteer";
import { timeout } from "./delay.js";
export const scrollDown = async (pagina) => {
	//Funcion para scrollear hasta el final de la página de a 900px cada 2s.

	const distance = 450; // Distancia de desplazamiento en px.
	const delay = 5000; // Espera en ms antes de deplazarnos de nuevo.

	//Scrollea hasta el final de la página al principio, fijarse que no de problemas.
	await timeout(delay);
	const initialHeight = await pagina.evaluate("document.body.scrollHeight");
	await pagina.evaluate(`window.scrollTo(0, ${initialHeight});`);
	await timeout(delay); // Delay para esperar carga de contenido del infinte scroll.
	let previousHeight = initialHeight;
	let counterScroll = 0; //Para evitar que se trabe cuando devuelve busquedas con montones de productos.
	while (true && counterScroll < 2) {
		await pagina.evaluate(`window.scrollBy(0,document.body.scrollHeight);`);
		await timeout(delay);
		let newHeight = await pagina.evaluate("document.body.scrollHeight");
		if (newHeight === previousHeight) {
			break;
		}
		previousHeight = newHeight;
		counterScroll++;
	}
};
