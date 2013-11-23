var numPersimmons = JSON.parse(localStorage.getItem("numPersimmons")) || 0;
var persimmonRate = 3000;

var lineLimit = 5;

function toConsole(text) {
    var currentText = $( '#consoleOut' ).html();
    
    var lines = currentText.split("<br>");
    while (lines.length >= lineLimit) {    
        lines.pop();
    }
    
    currentText = lines.join("<br>");

    $( '#consoleOut' ).html( text + "<br>" + currentText );
}

function updateSidebar() {
    var items = [
        { item: "Persimmons", value: numPersimmons }
    ];
    
    var sidebarContent = "";
    for (var i = 0; i < items.length; ++i) {
        sidebarContent = sidebarContent + items[i].value + " " 
                                        + items[i].item + "<br>";
    }
    $( '#sidebar' ).html(sidebarContent);
}

function updatePersimmon() {
    numPersimmons = numPersimmons + 1;
    localStorage.setItem("numPersimmons", numPersimmons);
    updateSidebar();
    window.setTimeout("updatePersimmon()", persimmonRate);
}

function reset() {
    numPersimmons = 0;
    localStorage.setItem("numPersimmons", numPersimmons);
}

function eatPersimmon() {
    numPersimmons = numPersimmons - 1;
    localStorage.setItem("numPersimmons", numPersimmons);
    toConsole( "You eat a persimmon. It tastes awful" );
    updateSidebar();
}

function main() {
    console.log("Test test");
    updatePersimmon();
}
