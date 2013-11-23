var numPersimmons = JSON.parse(localStorage.getItem("numPersimmons")) || 0;

function updatePersimmon() {
    $( '#consoleOut' ).text ("Persimmons: " + numPersimmons.toString());
    numPersimmons = numPersimmons + 1;
    localStorage.setItem("numPersimmons", numPersimmons);
    window.setTimeout("updatePersimmon()", 1000);
}

function reset() {
    numPersimmons = 0;
    localStorage.setItem("numPersimmons", numPersimmons);
}

function main() {
    console.log("Test test");
    window.setTimeout("updatePersimmon()", 1000);
}
