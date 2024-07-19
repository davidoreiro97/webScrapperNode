import { hiperLibertadScrapper } from "./scrapperMain.js";
export async function indexScrapperHiperLibertad(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await hiperLibertadScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando hiperLibertadScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("hiperLibertadScrapper finalizo.");
	}
}
