var page = require('webpage').create();
var config = require("./config.js");
var system = require('system');
var isReturningValue = false;
var bingoNumbers = null;
var scoreBingoCards = require("./score-bingo-cards.js");

// Arguments
config.username = system.args[1];
config.password = system.args[2];

var data = JSON.parse(system.args[3]);

config.setData(data);


listenToWebConsole();
visitLoginPage(config.loginPage, config.getCredentials()); // Success navigates to "Bingo Page"

// Login to the Loop
function visitLoginPage(url, credentials) {
    page.open(url, 'post', credentials, function(status) {
        if (status !== 'success') {
            console.log('\nWOOPS?');
            console.log('\nUnable to connect to with ' + config.loginPage);
            console.log('Please check your network settings and ensure the URL is correct');
            console.log('You can change the URL in the data.json file :)');
            screenCapture("login-fail.png");
            phantom.exit();
        } else {
			// TODO: 	Check URL to see if it successfully lands on loop homepage, else phantom.exit();
            console.log("Login Success!");
            screenCapture("login-success.png");
            visitBingoPage();
        }
    });
}


function visitBingoPage() {
	var numbers = null;
    page.open(config.currentGamePage, function(status) {
        if (status !== 'success') {
            console.log('Error: Could not find Bingo Page!');
			logout("Try changing the URL in the data.json text file.\nGood Luck!")
        } else {
            console.log("Arrived at Bingo page!");

            screenCapture("bingo-page.png");

            console.log("Checking Numbers...");
            //page.injectJs("./bingo.js");
            page.injectJs("./scrape-numbers.js");

            page.evaluate(function(config) {
				//console.log("return");
				//console.log(JSON.stringify(numbers));
            }, config);
        }
		logout("Best of Luck!");
        //phantom.exit();
    });
};


function logout(msg) {
	var message = msg;
	page.open(config.logoutPage,function(status){
		console.log("\nLogout successful.");
		screenCapture("logged-out.png");
//		if(arguments.length > 0) {
		console.log("\n" + message);
//		}
		phantom.exit();
	});
};

function listenToWebConsole() {
    // Print log from the web console to phantom console
    page.onConsoleMessage = function(msg) {
		if(!isReturningValue) {
			if(msg === "return"){
				return isReturningValue = true;
			}
        	return system.stdout.writeLine(msg);
		}
		if(isReturningValue){
			var bingoNumbers = JSON.parse(msg);
			//console.log(JSON.stringify(bingoNumbers,null,"  "));
			scoreBingoCards(JSON.stringify(bingoNumbers), JSON.stringify(config.getCurrentCards()));
			return isReturningValue = false;
		}
    };
    // Web console error messages
    page.onError = function(msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
            });
        }
        console.error(msgStack.join('\n'));
    };
};

function screenCapture(fileName) {
    var filePath = config.screenCaptureOutputDir + "/" + fileName;
    console.log("(Printing webpage to: " + filePath + ")\n");
    page.render(filePath);
};