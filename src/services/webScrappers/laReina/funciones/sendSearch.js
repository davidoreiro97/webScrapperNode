const sendSearch = (producto) => {
	// Realiza la busqueda del producto.
	const $inputBuscar = document.getElementById("cpoBuscar");
	const $formBuscar = document.getElementById("FormBus");
	$inputBuscar.value = producto;
	$formBuscar.submit();
};

export { sendSearch };
