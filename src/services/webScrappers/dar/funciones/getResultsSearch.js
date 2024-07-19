export const getResultsSearch = () => {
	let $resultadosContainer = document.getElementById("Resultados-In");
	let $listaProds = $resultadosContainer?.querySelector(".listaProds") || null;
	let todosLosProductos = [];
	if (!$listaProds) {
		return null;
	}
	// Funcion incluida en la página para ordenar de menor a mayor precio
	const delay = async () => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), 2000);
		});
	};
	const orderSearch = async () => {
		let counter = 0;
		while (true && counter < 3) {
			//Se ejecuta varias veces ya que no funciona a la primera.
			await delay();
			FOrden("MeMa");
			counter++;
		}
	};
	orderSearch();
	//Fin funcion
	Array.from($listaProds.children).forEach((liProducto) => {
		let urlProducto = "https://www.darentucasa.com.ar/";
		let tituloProducto = liProducto.querySelector(".desc")?.innerText || "";
		let precio = 0;
		if (liProducto.querySelector(".precio")) {
			precio = liProducto
				.querySelector(".precio")
				.querySelector(".izq")
				.innerText.slice(1, -3)
				.replace(".", "");
		}
		todosLosProductos.push({ urlProducto, tituloProducto, precio });
	});
	//Vuelvo a ordenar por las dudas.
	todosLosProductos.sort((a, b) => a.precio - b.precio);
	// Solo devuelvo los primeros 20.
	return todosLosProductos.slice(0, 20);
};
