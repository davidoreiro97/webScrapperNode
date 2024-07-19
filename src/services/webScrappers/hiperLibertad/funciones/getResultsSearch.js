export const getResultsSearch = () => {
	let $productosContainer =
		document.getElementById("gallery-layout-container")?.children || null;
	if (!$productosContainer) {
		return null;
	}
	let todosLosProductos = [];
	Array.from($productosContainer).forEach((e) => {
		let $element = e.children[0].getElementsByTagName("a")[0];
		let urlProducto = $element.href;
		let tituloProducto = $element.getElementsByClassName(
			"vtex-product-summary-2-x-productBrand vtex-product-summary-2-x-productBrand--defaultShelf-name vtex-product-summary-2-x-brandName vtex-product-summary-2-x-brandName--defaultShelf-name t-body"
		)[0].innerText;
		let precio = $element
			.querySelectorAll(
				'span[class="vtex-product-price-1-x-sellingPriceValue"]'
			)[0]
			.innerText.slice(1, -3)
			.replace(".", "");
		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
