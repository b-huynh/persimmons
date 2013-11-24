var persimmonRate = 10000;
var villagerRate = 10000;

var lineLimit = 5;

// New Player
var player = new player();

//Load existing player from local storage
player.numPersimmons = JSON.parse(localStorage.getItem("numPersimmons")) || 0;

for (var i = 0; i < player.villagers.length; ++i) {
    player.villagers[i].amount = JSON.parse( 
                localStorage.getItem(player.villagers[i].job) || 0);
}

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
        { item: "Persimmons", value: player.numPersimmons }
    ];
    
    var sidebarContent = "";
    for (var i = 0; i < items.length; ++i) {
        sidebarContent = sidebarContent + items[i].value + " " 
                                        + items[i].item + "<br>";
    }

    sidebarContent += "<br><br>";
    
    for (var i = 0; i < player.villagers.length; ++i) {
        sidebarContent = sidebarContent + player.villagers[i].amount + " "
                                        + player.villagers[i].job + "<br>";
    }

    $( '#sidebar' ).html(sidebarContent);
}

function updatePersimmon() {
    player.numPersimmons += 1;
    player.numPersimmons += player.getVillagerCount("farmer");
    updateSidebar();
    window.setTimeout("updatePersimmon()", persimmonRate);
}

function updateVillagers() {
    var loseChance = 10;
    var gainChance = 50;
    var newVillagerChance = Math.floor(Math.random() * 100 + 1);
    
    if (newVillagerChance >= gainChance)
        player.addVillager("unemployed", 1);
    else if (newVillagerChance <= loseChance)
        player.removeVillager("unemployed", 1);
    else;

    updateSidebar();
    
    villagerRate = Math.floor( Math.random() * 10000 + 1 );
    window.setTimeout("updateVillagers()", villagerRate);
}

function addFarmer(amount) {
    if (!player.removeVillager("unemployed", amount))
        return;
    player.addVillager("farmer", amount);
    updateSidebar();
}

function reset() {
    player.numPersimmons = 0;
    
    for (var i = 0; i < player.villagers.length; ++i) {
        player.villagers[i].amount = 0;
    }
    updateSidebar();
    save();
}

function eatPersimmon() {
    player.numPersimmons -= 1;
    toConsole( "You eat a persimmon. It tastes awful" );
    updateSidebar();
}

function save() {
    localStorage.setItem("numPersimmons", player.numPersimmons);
    player.saveVillagers();
    window.setTimeout("save()", 30000);
}

function main() {
    console.log("Test test");
    updatePersimmon();
    updateVillagers();
    save();
}
