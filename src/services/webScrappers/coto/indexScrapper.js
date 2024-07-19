import { cotoScrapper } from "./scrapperMain.js";
export async function indexScrapperCoto(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await cotoScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando crotoScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("cotoScrapper finalizo.");
	}
}
