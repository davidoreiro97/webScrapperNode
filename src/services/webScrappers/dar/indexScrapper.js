import { darScrapper } from "./scrapperMain.js";
export async function indexScrapperDar(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await darScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando DarScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("DarScrapper finalizó.");
	}
}
