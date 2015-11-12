//var numbers = {
//	game: 1,
//	uncalled: [],
//	called: [],
//	scrapeNumbers: (function () {
//		var cells = document.getElementsByTagName("td");
//		for (var i in cells) {
//			var thisCell = cells[i];
//			var thisNumber = parseInt(thisCell.innerText);
//
//			if (!isNaN(thisNumber)) {
//				if (thisCell.outerHTML.indexOf("#ffffff") !== -1) {
//					numbers.uncalled.push(thisNumber);
//				} else {
//					numbers.called.push(thisNumber);
//				}
//			}
//		}
//	})
//};
//numbers.scrapeNumbers();
//
//var cards = [
//	{
//		cardNumber: 8107,
//		game: 1,
//		active: [11, 6, 5, 9, 4, 24, 21, 23, 18, 22, 37, 33, 36, 39, 46, 58, 51, 53, 57, 74, 70, 72, 75, 62]
//	},
//	{
//		cardNumber: 8143,
//		game: 1,
//		active: [13, 11, 12, 4, 10, 22, 24, 17, 21, 16, 38, 37, 36, 34, 52, 51, 57, 46, 60, 68, 67, 63, 72, 64]
//	},
//	{
//		cardNumber: 8108,
//		game: 1,
//		active: [12, 3, 9, 2, 4, 22, 25, 19, 17, 29, 32, 38, 34, 43, 50, 47, 58, 53, 46, 75, 70, 72, 73, 62]
//	},
//	{
//		cardNumber: 8127,
//		game: 1,
//		active: [8, 13, 14, 2, 1, 28, 20, 27, 30, 26, 36, 42, 31, 45, 54, 50, 47, 55, 60, 69, 62, 61, 74, 70]
//	},
//	{
//		cardNumber: 8130,
//		game: 1,
//		active: [8, 4, 5, 1, 6, 26, 27, 20, 18, 29, 32, 37, 34, 31, 54, 51, 59, 55, 56, 70, 72, 62, 61, 69]
//	},
//	{
//		cardNumber: 430,
//		game: 2,
//		active: [3, 10, 12, 6, 13, 26, 21, 16, 25, 30, 40, 45, 36, 34, 58, 57, 49, 52, 46, 63, 67, 75, 69, 73]
//	},
//	{
//		cardNumber: 428,
//		game: 2,
//		active: [14, 11, 2, 9, 13, 24, 22, 29, 23, 30, 36, 31, 41, 32, 57, 60, 47, 52, 54, 74, 62, 69, 66, 71]
//	},
//	{
//		cardNumber: 426,
//		game: 2,
//		active: [12, 3, 10, 5, 14, 17, 28, 24, 20, 22, 45, 40, 41, 37, 51, 53, 46, 55, 58, 73, 63, 61, 71, 74]
//	},
//	{
//		cardNumber: 425,
//		game: 2,
//		active: [1, 4, 11, 2, 6, 23, 18, 26, 16, 27, 42, 43, 39, 32, 54, 47, 56, 57, 49, 69, 75, 70, 67, 64]
//	},
//	{
//		cardNumber: 424,
//		game: 2,
//		active: [8, 9, 15, 7, 13, 19, 21, 30, 29, 25, 40, 41, 31, 36, 48, 59, 52, 50, 60, 65, 68, 75, 62, 66]
//	}
//];
//
//
//evaluateCards();
//printResults();
//
//function evaluateCards(){
//	for (var i in cards) {
//		var card = cards[i];
//		card.called = [];
//		card.uncalled = [];
//		if (card.game === numbers.game) {
//
//			for (var j in numbers.called) {
//				var thisNumber = numbers.called[j];
//				if (card.active.indexOf(thisNumber) !== -1) {
//					card.called.push(thisNumber);
//				}
//			}
//			for (var k in numbers.uncalled) {
//				var thisNumber = numbers.uncalled[k];
//				if (card.active.indexOf(thisNumber) !== -1) {
//					card.uncalled.push(thisNumber);
//				}
//			}
//		}
//	};
//}
//
//function printResults() {
//	var sortedCards = cards.sort(function(a,b){
//		return a.uncalled.length - b.uncalled.length;
//	})
//	
//	for(var i = 0; i < sortedCards.length; i++){
//		if(sortedCards[i].game === numbers.game){
//			printResult(sortedCards[i]);
//		}
//	}
//	
//}
//
//function printResult(card) {
//	console.log("\n*************");
//	console.log("Card #" + card.cardNumber);
//	
//	if(card.uncalled.length === 0) {
//		console.log("******* <<<!!!BINGO!!!>>> ********");
//	}
//	
//	console.log("Hit " + card.called.length + ":");
//	console.log("[ " + card.called.sort(ascending).join(", ") + " ]");
//	console.log("Missed " + card.uncalled.length + ":");
//	console.log("[ " + card.uncalled.sort(ascending).join(", ") + " ]");
//	console.log("*************");
//};
//
//function ascending(a, b) {
//	return a - b;
//}