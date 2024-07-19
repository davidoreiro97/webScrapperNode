import { indexScrapperReina } from "./services/webScrappers/laReina/indexScrapper.js";
import { indexScrapperGallega } from "./services/webScrappers/laGallega/indexScrapper.js";
import { indexScrapperHiperLibertad } from "./services/webScrappers/hiperLibertad/indexScrapper.js";
import { indexScrapperCoto } from "./services/webScrappers/coto/indexScrapper.js";
import { indexScrapperDar } from "./services/webScrappers/dar/indexScrapper.js";
import { indexScrapperArcoiris } from "./services/webScrappers/arcoiris/indexScrapper.js";
import { indexScrapperJumbo } from "./services/webScrappers/jumbo/indexScrapper.js";
import { indexScrapperCarrefour } from "./services/webScrappers/carrefour/indexScrapper.js";
export const callScrappers = async (input, navegador) => {
	console.log("------------------- CROTO -------------------");
	await indexScrapperCoto("COTO", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- LA REINA -------------------");
	await indexScrapperReina("LA REINA", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- LA GALLEGA -------------------");
	await indexScrapperGallega("LA GALLEGA", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- LIBERTAD -------------------");
	await indexScrapperHiperLibertad("HIPERMERCADO LIBERTAD", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- DAR -------------------");
	await indexScrapperDar("DAR", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- ARCOIRIS -------------------");
	await indexScrapperArcoiris("ARCOIRIS", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- JUMBO -------------------");
	await indexScrapperJumbo("JUMBO", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
	console.log("------------------- CARREFOUR -------------------");
	await indexScrapperCarrefour("CARREFOUR", input, navegador)
		.then(() => console.log("Consulta finalizada con exito."))
		.catch((error) => console.error("Error:", error));
};
