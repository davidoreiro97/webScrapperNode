import { arcoirisScrapper } from "./scrapperMain.js";
export async function indexScrapperArcoiris(
	nombreSupermercado,
	nombreProducto,
	instanciaNavegador
) {
	try {
		await arcoirisScrapper(nombreProducto, instanciaNavegador);
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} catch (e) {
		console.log(
			`╔═════════════════ERROR EJECUTANDO LA BUSQUEDA DEL PRODUCTO ${nombreProducto}════════════`
		);
		console.log(e);
		console.log("Error ejecutando arcoirisScrapper");
		console.log(
			`═════════════════════════════════════════════════════════════════════════════════════════`
		);
	} finally {
		console.log("arcoirisScrapper finalizó.");
	}
}
