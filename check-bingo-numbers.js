var fs = require("fs");
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var prompt = require("prompt");
var chalk = require("chalk");

var data = fs.readFileSync("./data.json", 'utf8');

var phantomScript = path.join(__dirname, 'phantom-script.js');
//console.log(JSON.stringify(data,null,"	"));

var fields = {
    username: "",
    password: "",
    setUsername: function() {
        if (process.argv[2]) {
            this.username = process.argv[2];
			this.update();
        } else {
            promptUser("username");
        }

    },
    setPassword: function() {
        if (process.argv[3]) {
            this.password = process.argv[3];
			this.update();
        } else {
            promptUser("password");
        }
    },
    update: function() {
        if (this.username == "") {
            this.setUsername();
        } else if (this.password == "") {
            this.setPassword();
        } else {
            spawnPhantom();
        }
    }
};
fields.update();

function promptUser(missingField) {
	var args = {
      	name: missingField,
		required: true
	}
	if(missingField === "password") {
		args.hidden = true;
	}
    prompt.start();
    prompt.get([args], function(err, result) {
        if (err) {
            console.log(JSON.stringify(err, null, "  "));
        }
        if (result[missingField] !== "") {
            fields[missingField] = result[missingField];
        }
        fields.update();
    });
};

function spawnPhantom() {
	console.log(chalk.green("\nPlease wait a few moments while checking numbers"));
	console.log(chalk.red("You can abort at any time by pressing \"Ctrl + C\"\n"));

    var childArgs = [phantomScript, fields.username, fields.password, data];
	
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) {
            console.log("Phantom Error: " + JSON.stringify(err));
        }
        if (stderr) {
            console.log("Errors on page:\n" + stderr);
        }
        console.log(stdout);
    });
};