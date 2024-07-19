import { carrefourScrapper } from "./scrapperMain.js";
export async function indexScrapperCarrefour(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await carrefourScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando carrefourScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("carrefourScrapper finalizo.");
	}
}
