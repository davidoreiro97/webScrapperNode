import { sendSearch } from "./funciones/sendSearch.js";
import { getResultsSearch } from "./funciones/getResultsSearch.js";
export async function laGallegaScrapper(nombreProducto, instanciaNavegador) {
	let resultadoBusqueda = [];
	const url_pagina_supermercado = "https://www.lagallega.com.ar/login.asp";
	const pagina = await instanciaNavegador.newPage();
	pagina.setDefaultNavigationTimeout(45000); //Tiempo de espera máximo para la navegación.
	await pagina.setRequestInterception(true);
	pagina.on("request", (request) => {
		if (
			request.resourceType() === "image" ||
			request.resourceType() === "stylesheet" ||
			request.resourceType() === "font"
		) {
			request.abort(); // Cancela la carga de la imagen ,archivo css y fuentes.
		} else {
			request.continue(); // Continuar con la solicitud de otros recursos
		}
	});
	try {
		await pagina.goto(url_pagina_supermercado);
	} catch (err) {
		if (err.name === "TimeoutError") {
			console.log(
				"Se excedio el tiempo de espera límite al conectar con la página."
			);
		}
		await pagina.close();
		return (resultadoBusqueda = null);
	}
	await pagina.setCookie({
		name: "cantP",
		value: "100",
		domain: "www.lagallega.com.ar",
	});
	await pagina.setViewport({ width: 1600, height: 900 });
	await pagina.waitForSelector("#FormBus");
	await pagina.evaluate(sendSearch, nombreProducto);

	try {
		await pagina.waitForSelector("#Resultados-In", { timeout: 15000 });
		try {
			await pagina.waitForSelector("#Resultados-In .izq", {
				timeout: 15000,
			});
			resultadoBusqueda = await pagina.evaluate(getResultsSearch);
		} catch (e) {
			console.log(
				"No se llegó a cargar el precio (#Resultados-In .izq) o la busqueda no tuvo resultados."
			);
			resultadoBusqueda = null;
		} finally {
			resultadoBusqueda = await pagina.evaluate(getResultsSearch);
		}
	} catch (error) {
		if (error.name === "TimeoutError") {
			console.log(
				"Se excedio el tiempo de espera límite al realizar la busqueda en la página."
			);
			resultadoBusqueda = null;
		} else {
			console.error("Error al obtener los resultados de búsqueda:", error);
			resultadoBusqueda = null;
		}
	}
	console.log(
		`╔═════════════════ BUSQEUDA DEL PRODUCTO ${nombreProducto} ════════════════════════════════`
	);
	console.log(resultadoBusqueda);
	await pagina.close();
	// return resultadoBusqueda;
}
