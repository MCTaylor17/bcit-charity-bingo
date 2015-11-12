module.exports = function(n, c) {
    //console.log(n);
    //console.log(c);

    var numbers = JSON.parse(n);
    var cards = JSON.parse(c);
    //console.log("CARDS" + JSON.stringify(cards));


    var boxSettings = {
        width: 50
    };

    function Box(args) {
        this.width = args.width || 50;
        this.lines = [];

        // LEFT
        this.leftMargin = "    ";
        this.leftBorder = "|";
        this.leftPadding = " ";
        this.left = "\n" + this.leftMargin + this.leftBorder;

        // RIGHT
        //this.rightPadding = "    ";
        this.rightBorder = "|";
        this.rightMargin = "";
        this.right = this.rightBorder;

        // EMPTY FILL
        this.blankLine = this.left + repeatChar(" ", this.width) + this.right;

        // TOP
        this.topMargin = "\n";
        this.topBorder = "_";
        this.topPadding = this.blankLine;
        this.top = this.leftMargin + repeatChar(this.topBorder, this.width + 2) + this.topPadding;

        // BOTTOM
        this.bottomPadding = this.blankLine;
        this.bottomBorder = "_";
        this.bottomMargin = "\n";
        this.bottom = this.bottomPadding + this.left + repeatChar(this.bottomBorder, this.width) + this.rightBorder + this.bottomMargin;

        this.newLine = function() {
            return this.left;
        };
        this.addLine = function(line) {
            var maxWidth = this.width;
            if (line.length >= maxWidth) {
                var splitIndex = line.lastIndexOf(" ", maxWidth - 6) + 1;

                if (splitIndex !== -1) {
                    var spaces = line.match(/\s/g).length;

                    if (spaces < line.length - this.left.length - this.right.length) {
                        var segmentA = line.substring(0, splitIndex);
                        var segmentB = line.substring(splitIndex);
                        this.lines.push(segmentA);
                        this.lines.push(segmentB);
                        return;
                    }
                }
            }
            this.lines.push(line);

        };
        this.packBox = function() {
            var string = "";
            string += this.top;

            for (var i = 0; i < this.lines.length; i++) {
                var line = this.lines[i];

                var leftSide = this.left + this.leftPadding + line;

                if (leftSide.length <= this.width) {
                    var padding = this.width - leftSide.length;
                    string += leftSide + repeatChar(" ", padding + 6) + this.right;

                } else {
                    string += leftSide;
                }

            }
            string += this.bottom;
            console.log(string);
        }

    };


    evaluateCards();
    printResults();

    function repeatChar(character, repeat) {
        var string = "";
        var n = repeat;
        while (n-- > 0) {
            string += character;
        }
        return string;
    };




    function evaluateCards() {
        for (var i in cards) {
            var card = cards[i];
            card.called = [];
            card.uncalled = [];

            for (var j in numbers.called) {
                var thisNumber = numbers.called[j];
                if (card.active.indexOf(thisNumber) !== -1) {
                    card.called.push(thisNumber);
                }
            }
            for (var k in numbers.uncalled) {
                var thisNumber = numbers.uncalled[k];
                if (card.active.indexOf(thisNumber) !== -1) {
                    card.uncalled.push(thisNumber);
                }
            }
        };
    }

    //    function printResults() {
    //        var sortedCards = cards.sort(function(a, b) {
    //            return a.uncalled.length - b.uncalled.length;
    //        });
    //
    //        for (var i = 0; i < sortedCards.length; i++) {
    //            printResult(sortedCards[i]);
    //        }
    //
    //    }

    function sortByMostCalled() {
        var sortedCards = cards.sort(function(a, b) {
            return b.called.length - a.called.length;
        });
        return sortedCards;
    }

    function printResults() {
        var sortedCards = sortByMostCalled(cards)
        for (var i = 0; i < sortedCards.length; i++) {
            printResult(sortedCards[i]);
        }
    }


    function printResult(card) {
        var box = new Box(boxSettings);
        box.addLine("Card #" + card.cardNumber);

        if (card.uncalled.length === 0 && card.called.length === 24) {
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< B >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< I >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< N >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< G >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< O >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            box.addLine("<<<<<<<<<<<<<<<<<<<<<<<<<<< ! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        }

        box.addLine("This card is " + Math.round(card.called.length / 24 * 100) + "% complete:");
        box.addLine(card.called.sort(ascending).join(", "));
        //        box.addLine(box.blankLine);
        box.addLine("There are " + card.uncalled.length + " numbers remaining:");
        box.addLine(card.uncalled.sort(ascending).join(", "));
        box.packBox();
        box = null;
    };

    function ascending(a, b) {
        return a - b;
    }
};