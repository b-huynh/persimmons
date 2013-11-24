function line (string, width) {
    this.width = width;
    this.string = string;
}

function house () {
    this.width = 6;
    this.height = 3;

    var line1 = new line("&nbsp___¶&nbsp", this.width);
    var line2 = new line("/____\\", this.width);
    var line3 = new line("|_{}_|", this.width);

    this.lines = 
    [   
        line1,
        line2,
        line3,
    ]; 
}

function farm () {
    this.width = 6;
    this.height = 3;

    this.lines = 
    [
        new line("x====x", this.width),
        new line("|*.*.|", this.width),
        new line("x====x", this.width),
    ];
}

function tree () {
    this.width = 13;
    this.height = 8;

    this.lines = 
    [
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp._%|%%&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp-.%-%|%~_%.&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
        new line("&nbsp&nbsp&nbsp&nbsp&nbsp%~%&nbsp&nbsp&nbsp&nbsp&nbsp", this.width),
    ];
}

function town () {
    this.maxWidth = 115;
    this.maxHeight = 30;
    
    this.lines = new Array (this.maxHeight);
    this.lineWidths = new Array(this.maxHeight);

    for (var i = 0; i < this.maxHeight; ++i) {
        this.lines[i] = new Array();
        this.lineWidths[i] = 0;
    }

    this.addAsciiObject = function (object) {
        for (var i = 0; i < this.maxHeight - object.height; ++i) {
            var spacesLeft = this.maxWidth - this.lineWidths[i];
            if (spacesLeft < object.width)
                continue;

            var canFit = true;
            for (var j = 0; j < object.height; ++j) {
                if (this.maxWidth - this.lineWidths[i + j] != spacesLeft) {
                    canFit = false;
                    break;
                }
            }

            if (canFit) {
                for (var j = 0; j < object.height; ++j) {
                    this.lines[i + j].push(object.lines[j]);
                    this.lineWidths[i + j] += object.lines[j].width;
                }
                return;
            }
        }
    }

    this.map = function () {
        var lineText = "";
        for (var i = 0; i < this.lines.length; ++i) {
            for (var j = 0; j < this.lines[i].length; ++j) {
                lineText += this.lines[i][j].string;
            }
            lineText += "<br>";
        }
        return lineText;
    }
}
