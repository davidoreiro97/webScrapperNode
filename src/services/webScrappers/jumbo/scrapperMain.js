import { scrollDown } from "./funciones/scrolDown.js";
import { getResultsSearch } from "./funciones/getResultsSearch.js";
export async function jumboScrapper(nombreProducto, instanciaNavegador) {
	let resultadoBusqueda = [];
	let url_pagina_supermercado = "";
	//Si la consulta tiene espacios en el medio quitar el &order=OrderByPriceASC ya que las páginas realizan un poco la busqueda.
	if (nombreProducto.trim().split(" ").lenght > 1) {
		url_pagina_supermercado = `https://www.jumbo.com.ar/${nombreProducto}?_q=${nombreProducto}&map=ft`;
	} else {
		url_pagina_supermercado = `https://www.jumbo.com.ar/${nombreProducto}?_q=${nombreProducto}&map=ft&order=OrderByPriceASC`;
	}

	const pagina = await instanciaNavegador.newPage();
	pagina.setDefaultNavigationTimeout(45000); //Tiempo de espera máximo para la navegación.
	await pagina.setRequestInterception(true);
	pagina.on("request", (request) => {
		if (
			request.resourceType() === "stylesheet" ||
			request.resourceType() === "font" ||
			request.resourceType() === "media" ||
			request.resourceType() === "texttrack" ||
			request.resourceType() === "eventsource" ||
			request.resourceType() === "manifest"
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
			domain: "www.jumbo.com.ar",
		},
		{
			name: "CheckoutOrderFormOwnership",
			value: "",
			domain: "www.hiperlibertad.com.ar",
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
		await pagina.waitForSelector("#gallery-layout-container", {
			timeout: 10000,
		});
		await scrollDown(pagina);
		try {
			await pagina.waitForSelector(
				".vtex-product-summary-2-x-clearLink.h-100.flex.flex-column"
			);
			await pagina.waitForSelector(
				".vtex-product-summary-2-x-productBrand.vtex-product-summary-2-x-brandName.t-body"
			);
			await pagina.waitForSelector(
				".jumboargentinaio-store-theme-1dCOMij_MzTzZOCohX1K7w"
			);
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
					".lh-copy.vtex-rich-text-0-x-paragraph.vtex-rich-text-0-x-paragraph--list-opss-green-title"
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
