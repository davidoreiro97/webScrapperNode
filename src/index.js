//index.js
import readline from "readline";
import puppeteer from "puppeteer";
import { callScrappers } from "./callScrappers.js";
//const navegador = await puppeteer.launch({ headless: false, slowMo: 250 });
const navegador = "";
const rl = readline.createInterface({
	// Interfaz para readline
	input: process.stdin,
	output: process.stdout,
});

console.log("-------------- Ctrl+C para salir --------------");
console.log("Producto a buscar : ");

rl.on("line", (input) => {
	callScrappers(input, navegador);
});

rl.on("SIGINT", () => {
	// Señal de interrupción (Ctrl+C)
	console.log("\nSaliendo...");
	rl.close();
});
