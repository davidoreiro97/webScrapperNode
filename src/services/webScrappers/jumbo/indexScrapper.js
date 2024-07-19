import { jumboScrapper } from "./scrapperMain.js";
export async function indexScrapperJumbo(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await jumboScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando jumboScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("jumboScrapper finalizo.");
	}
}
