export const getResultsSearch = () => {
	let $productosContainer =
		document.getElementById("products")?.querySelectorAll("li") || null;
	if (!$productosContainer) {
		return null;
	}
	let todosLosProductos = [];

	Array.from($productosContainer).forEach((e) => {
		let tituloProducto = e.querySelector(".descrip_full").innerText;
		let precio =
			parseInt(
				e.querySelector(".price_discount")?.innerText.trim().replace("$", "")
			) ||
			parseInt(
				e
					.querySelector(".price_discount_gde")
					?.innerText.trim()
					.replace("$", "")
			) ||
			null;
		if (!precio) {
			precio = e
				.querySelector(".atg_store_newPrice")
				.innerText.trim()
				.slice(1, -3)
				.replace(".", "");
		}
		let urlProducto = e
			.querySelector(".product_info_container")
			.querySelector("a").href;
		precio = precio.toString();
		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
