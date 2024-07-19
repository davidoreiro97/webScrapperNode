export const timeout = async (tiempo) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), tiempo);
	});
};
