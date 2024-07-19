export const getResultsSearch = () => {
	let $productosContainer =
		document.querySelector(
			".valtech-carrefourar-search-result-0-x-gallery.flex.flex-row.flex-wrap.items-stretch.bn.ph1.na4.pl9-l"
		)?.children || null;
	if (!$productosContainer) {
		return null;
	}
	let todosLosProductos = [];
	let precio = 0;
	Array.from($productosContainer).forEach((e) => {
		let $element = e.children[0].getElementsByTagName("a")[0];
		let urlProducto = $element?.href || null;
		let tituloProducto =
			e.querySelector(
				".vtex-product-summary-2-x-productBrand.vtex-product-summary-2-x-brandName.t-body"
			)?.innerText || "";

		precio =
			parseInt(
				e
					.querySelector(
						".valtech-carrefourar-product-price-0-x-sellingPriceValue"
					)[0]
					?.innerText.replace("$", "")
					.replace(".", "")
					.replace(",", ".")
			) || null;
		if (!precio) {
			precio =
				parseInt(
					e
						.querySelector(".valtech-carrefourar-product-price-0-x-listPrice")
						?.innerText.replace("$", "")
						.replace(".", "")
						.replace(",", ".")
				) || null;
			if (!precio) {
				precio =
					parseInt(
						e
							.querySelector(
								".valtech-carrefourar-product-price-0-x-currencyContainer"
							)
							?.innerText.replace("$", "")
							.replace(".", "")
							.replace(",", ".")
					) || null;
			}
		}

		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
