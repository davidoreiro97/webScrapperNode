import { laReinaScrapper } from "./scrapperMain.js";
export async function indexScrapperReina(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await laReinaScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando laReinaScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("LaReinaScrapperFinalizó.");
	}
}
