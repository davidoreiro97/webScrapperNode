export const orderSearch = () => {
	let $optionMinToMax =
		document.getElementById("sortBySelect").children[5].value;
	location = $optionMinToMax.toString();
};
