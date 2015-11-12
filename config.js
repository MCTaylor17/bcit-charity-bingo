var config = {};

config.setData = function(data) {
	this.currentGameNumber = data.currentGameNumber;
	this.evaluateAll = data.evaluateAll;
	this.loginPage = data.loginPage;
	this.logoutPage = data.logoutPage;
	this.autoLogin = data.autoLogin;
	this.screenCaptureOutputDir = data.screenCaptureOutputDir;
	this.cards = data.cards;
	this.currentGamePage = data.gameResultPages[data.currentGameNumber];
	this.getCurrentCards = function(){
		if(this.evaluateAll){
			return this.cards;
		}
		if(!this.evaluateAll){
			var gameNumber = this.currentGameNumber;
			var cards = this.cards.filter(function(card){
				return card.game == gameNumber;
			});
			return cards;			
		}
	};
	this.getCredentials = function(){
		return "username=" + this.username + "&password=" + this.password + "&autoLogin=" + this.autoLogin;
	};
	this.getCurrentGamePage = function() {
		return this.currentGamePage;
	};
};

module.exports = config;