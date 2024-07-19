import { scrollDown } from "./funciones/scrolDown.js";
import { getResultsSearch } from "./funciones/getResultsSearch.js";
import { timeout } from "./funciones/delay.js";
export async function carrefourScrapper(nombreProducto, instanciaNavegador) {
	let resultadoBusqueda = [];
	let url_pagina_supermercado = "";
	//Si la consulta tiene espacios en el medio quitar el &order=OrderByPriceASC ya que las páginas realizan un poco la busqueda.
	if (nombreProducto.trim().split(" ").lenght > 1) {
		url_pagina_supermercado = `https://www.carrefour.com.ar/${nombreProducto}?_q=${nombreProducto}&map=ft`;
	} else {
		url_pagina_supermercado = `https://www.carrefour.com.ar/${nombreProducto}?_q=${nombreProducto}&map=ft&order=OrderByPriceASC`;
	}

	const pagina = await instanciaNavegador.newPage();
	pagina.setDefaultNavigationTimeout(45000); //Tiempo de espera máximo para la navegación.
	await pagina.setRequestInterception(true);
	pagina.on("request", (request) => {
		if (
			//request.resourceType() === "stylesheet" ||
			request.resourceType() === "font" ||
			request.resourceType() === "media" ||
			request.resourceType() === "texttrack"
			//request.resourceType() === "eventsource" ||
			//request.resourceType() === "manifest"
		) {
			request.abort(); // Cancela la carga de la imagen ,archivo css y fuentes.
		} else {
			request.continue(); // Continuar con la solicitud de otros recursos
		}
	});
	let nombreFormatoQuery = encodeURIComponent(nombreProducto);
	await pagina.setCookie(
		{
			name: "biggy-search-history",
			value: `${nombreFormatoQuery}`,
			domain: "www.carrefour.com.ar",
		},
		{
			name: "CheckoutOrderFormOwnership",
			value: "",
			domain: "www.carrefour.com.ar",
		}
	);
	try {
		await pagina.setViewport({ width: 1600, height: 1080 });
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

	try {
		await pagina.waitForSelector(
			".valtech-carrefourar-search-result-0-x-gallery.flex.flex-row.flex-wrap.items-stretch.bn.ph1.na4.pl9-l",
			{
				timeout: 10000,
			}
		);
		// await scrollDown(pagina);
		try {
			try {
				await pagina.waitForSelector(
					".vtex-product-summary-2-x-productBrand.vtex-product-summary-2-x-brandName.t-body"
				);
				await pagina.waitForSelector(
					".valtech-carrefourar-product-price-0-x-currencyContainer"
				);
				await pagina.waitForSelector(
					".vtex-product-summary-2-x-clearLink.vtex-product-summary-2-x-clearLink--contentProduct.h-100.flex.flex-column"
				);
			} catch (e) {
				console.error(e);
			}
			await scrollDown(pagina);
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
			try {
				await pagina.waitForSelector(
					".lh-copy.vtex-rich-text-0-x-paragraph.vtex-rich-text-0-x-paragraph--titleNotFound"
				);
				console.log("Busqueda sin resultados.");
			} catch (e) {
				console.log(
					"Se excedio el tiempo de espera límite al realizar la busqueda en la página."
				);
			} finally {
				resultadoBusqueda = null;
			}
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
