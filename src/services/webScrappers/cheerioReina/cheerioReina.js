import cheerio from "cheerio";
export const CheerioReinaGET = async (input) => {
	//Ver si antes de hacer el fetch no hay que abrir un navegador con pupetter.
	const urlFetch = `https://www.lareinaonline.com.ar/productosnl.asp?TM=Bus&cpoB=${input}`;
	try {
		const optionsFetch = {
			headers: {
				Cookie: "cantP=500",
			},
		};
		let response = await fetch(urlFetch, optionsFetch);
		let resHTML = await response.text();
		const $ = cheerio.load(resHTML);
		const productos = [];
		$(".cuadProd").each((index, element) => {
			const titulo = $(element)
				.find(".desc")
				.text()
				.replace(/\s+/g, " ")
				.trim();
			const precio = $(element)
				.find(".precio .izq")
				.text()
				.trim()
				.slice(1, -3)
				.replace(".", "");
			const linkAProducto =
				"https://www.lareinaonline.com.ar/" +
				$(element).find(".FotoProd a").attr("href");
			productos.push({ titulo, precio, linkAProducto });
		});
		//Si devolvemos productos vacio no hubo resultados.
		if (productos.length > 0) {
			productos.sort((a, b) => a.precio - b.precio);
		}
		console.log(productos.slice(0, 20));
	} catch (e) {
		console.error("Error:", e);
	}
};
