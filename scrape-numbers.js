var numbers = {
	game: 1,
	uncalled: [],
	called: [],
	scrapeNumbers: (function () {
		var cells = document.getElementsByTagName("td");
		for (var i in cells) {
			var thisCell = cells[i];
			var thisNumber = parseInt(thisCell.innerText);

			if (!isNaN(thisNumber)) {
				if (thisCell.outerHTML.indexOf("#ffffff") !== -1) {
					numbers.uncalled.push(thisNumber);
				} else {
					numbers.called.push(thisNumber);
				}
			}
		}
	})
};
numbers.scrapeNumbers();
console.log("return")
console.log(JSON.stringify(numbers));
