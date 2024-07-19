import { laGallegaScrapper } from "./scrapperMain.js";
export async function indexScrapperGallega(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await laGallegaScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando laGallegaScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("laGallegaScrapper finalizo.");
	}
}
