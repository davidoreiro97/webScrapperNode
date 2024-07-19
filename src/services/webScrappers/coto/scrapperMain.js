import { getResultsSearch } from "./funciones/getResultsSearch.js";
import { orderSearch } from "./funciones/orderSearch.js";
import { postSearch } from "./funciones/postSearch.js";
export async function cotoScrapper(nombreProducto, instanciaNavegador) {
	let resultadoBusqueda = [];
	const url_pagina_supermercado = `https://www.cotodigital3.com.ar/sitios/cdigi/`;
	const pagina = await instanciaNavegador.newPage();
	pagina.setDefaultNavigationTimeout(25000); //Tiempo de espera máximo para la navegación.
	await pagina.setRequestInterception(true);
	pagina.on("request", (request) => {
		if (
			request.resourceType() === "stylesheet" ||
			request.resourceType() === "image" ||
			request.resourceType() === "font" ||
			request.resourceType() === "media" ||
			request.resourceType() === "script" ||
			request.resourceType() === "fetch" ||
			request.resourceType() === "xhm" ||
			request.resourceType() === "texttrack" ||
			request.resourceType() === "eventsource" ||
			request.resourceType() === "websocket" ||
			request.resourceType() === "manifest"
		) {
			request.abort(); // Cancela la carga de la imagen ,archivo css y fuentes.
		} else {
			request.continue(); // Continuar con la solicitud de otros recursos
		}
	});
	try {
		try {
			await pagina.goto(url_pagina_supermercado);
		} catch (e) {
			//Si no puedo ingresar trato de recargarla
			await pagina.goto(url_pagina_supermercado);
		}
		await pagina.setViewport({ width: 1600, height: 900 });
		await pagina.waitForSelector("#searchForm");
		await pagina.evaluate(postSearch, nombreProducto);
	} catch (err) {
		if (err.name === "TimeoutError") {
			console.log(
				"Se excedio el tiempo de espera límite al conectar con la página."
			);
		}
		await pagina.close();
		return (resultadoBusqueda = null);
	}
	try {
		try {
			try {
				await pagina.waitForSelector("#products", {
					timeout: 15000,
				});
			} catch (e) {
				await pagina.reload({
					waitUntil: ["networkidle0", "domcontentloaded"],
				});
			}

			//apretar el filtro de menor a mayor precio.
			await pagina.waitForSelector("#sortBySelect");
			await pagina.evaluate(orderSearch);
		} catch (e) {
			if (error.name === "TimeoutError") {
				console.log(
					"Se excedio el tiempo de espera límite al realizar la busqueda en la página."
				);
				resultadoBusqueda = null;
			} else {
				await pagina.waitForSelector(
					".atg_store_noMatchingItem atg_store_generalMessage",
					{
						timeout: 10000,
					}
				);
				console.log("Sin resultados");
				resultadoBusqueda = null;
			}
		}

		try {
			await pagina.waitForSelector(".atg_store_newPrice", {
				timeout: 10000,
			});
			resultadoBusqueda = await pagina.evaluate(getResultsSearch);
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
	} catch (error) {
		if (error.name === "TimeoutError") {
			console.log(
				"Se excedio el tiempo de espera límite al realizar la busqueda en la página."
			);
			resultadoBusqueda = null;
		} else {
			console.log("No existen resultados para esta busqueda");
			resultadoBusqueda = null;
		}
	} finally {
		console.log(
			`╔═════════════════ BUSQUEDA DEL PRODUCTO ${nombreProducto} ════════════════════════════════`
		);
		console.log(resultadoBusqueda);
		await pagina.close();
		// return resultadoBusqueda;
	}
}
