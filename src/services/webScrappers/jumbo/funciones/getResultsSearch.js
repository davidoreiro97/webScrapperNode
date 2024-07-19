export const getResultsSearch = () => {
	let $productosContainer =
		document.getElementById("gallery-layout-container")?.children || null;
	if (!$productosContainer) {
		return null;
	}
	let todosLosProductos = [];
	Array.from($productosContainer).forEach((e) => {
		let $element = e.children[0].getElementsByTagName("a")[0];
		let urlProducto = $element?.href || null;
		let tituloProducto =
			e.querySelector(
				".vtex-product-summary-2-x-productBrand.vtex-product-summary-2-x-brandName.t-body"
			)?.innerText || "";
		let precio =
			parseInt(
				e
					.querySelector(".jumboargentinaio-store-theme-1dCOMij_MzTzZOCohX1K7w")
					?.innerText.replace("$", "")
					.replace(".", "")
					.replace(",", ".")
			) || "";
		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
