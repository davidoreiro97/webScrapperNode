export const postSearch = (productName) => {
	let $searchInput = document.getElementById("atg_store_searchInput");
	$searchInput.value = productName;
	let $nttInput = document.getElementById("Ntt");
	$nttInput.value = productName;
	let $searchForm = document.getElementById("searchForm");
	$searchForm.submit();
};
