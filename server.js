var fs = require( 'fs' );
var express = require( 'express' );
var app = express();

app.use(express.static( __dirname + "/public" ));

app.get('/', function(req, res) {
    fs.readFile( __dirname + "/persimmon.html", 'utf8', function(err, text) {
        res.send(text);
    });
});

app.listen(process.env.PORT || 3000);
