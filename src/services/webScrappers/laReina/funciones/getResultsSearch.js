export const getResultsSearch = () => {
	let $resultadosContainer = document.getElementById("Resultados-In");
	let $listaProds = $resultadosContainer?.querySelector(".listaProds") || null;
	let todosLosProductos = [];
	if (!$listaProds) {
		return null;
	}

	Array.from($listaProds.children).forEach((liProducto) => {
		let urlProducto =
			liProducto.querySelector(".FotoProd")?.getElementsByTagName("a")[0]
				?.href || "";
		let tituloProducto = liProducto.querySelector(".desc")?.innerText || "";
		let precio = 0;
		if (liProducto.querySelector(".precio")) {
			if (liProducto.querySelector(".precio").querySelector(".der")) {
				precio = liProducto
					.querySelector(".precio")
					.querySelector(".der")
					.innerText.slice(1, -3)
					.replace(".", "");
			} else {
				precio = liProducto
					.querySelector(".precio")
					.querySelector(".izq")
					.innerText.slice(1, -3)
					.replace(".", "");
			}
		}

		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	todosLosProductos.sort((a, b) => a.precio - b.precio);
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
