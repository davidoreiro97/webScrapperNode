import { timeout } from "puppeteer";
import { getResultsSearch } from "./funciones/getResultsSearch.js";
import { scrollDown } from "./funciones/scrolDown.js";
export async function hiperLibertadScrapper(
	nombreProducto,
	instanciaNavegador
) {
	let resultadoBusqueda = [];
	const url_pagina_supermercado = `https://www.hiperlibertad.com.ar/${nombreProducto}?_q=${nombreProducto}&map=ft&order=OrderByPriceASC`;
	const pagina = await instanciaNavegador.newPage();
	pagina.setDefaultNavigationTimeout(45000); //Tiempo de espera máximo para la navegación.
	let nombreFormatoQuery = encodeURIComponent(nombreProducto);
	await pagina.setCookie(
		{
			name: "CheckoutOrderFormOwnership",
			value: "true",
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "store-name",
			value: "SANTA%2520FE%2520-%2520Hipermercado%2520Rosario",
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "VTEXSC",
			value: "sc=11",
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "storeType",
			value: "0",
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "biggy-search-history",
			value: `${nombreFormatoQuery}`,
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "store-sale-channel",
			value: "11",
			domain: "www.hiperlibertad.com.ar",
		},
		{
			name: "storeSelectorId",
			value: "111",
			domain: "www.hiperlibertad.com.ar",
		}
	);
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
	await pagina.setViewport({ width: 1600, height: 900 });
	try {
		try {
			//Refrescar la página por que anda medio rara.
			let counter = 0;
			while (true && counter < 1) {
				await pagina.reload({
					waitUntil: ["networkidle0", "domcontentloaded"],
				});
				counter++;
			}
		} catch (error) {
			console.error("Error al refrescar la página:", error);
			await pagina.close();
			return (resultadoBusqueda = null);
		}
		await pagina.waitForSelector("#gallery-layout-container", {
			timeout: 10000,
		});
		await scrollDown(pagina);
		try {
			await pagina.waitForSelector(
				".vtex-product-price-1-x-currencyContainer",
				{
					timeout: 5000,
				}
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
