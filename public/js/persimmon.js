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

    for (var i = 0; i < player.items.length; ++i) {
        sidebarContent = sidebarContent + player.items[i].amount + " " 
                                        + player.items[i].item + "<br>";
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

function updateItems() {
}

function updateVillagers() {
    var loseChance = 10;
    var gainChance = 50;
    var newVillagerChance = Math.floor(Math.random() * 100 + 1);
    
    if (newVillagerChance >= gainChance)
        player.addVillager("unemployed", 1);
    else if (newVillagerChance <= loseChance)
        player.removeVillager("unemployed", 1);

    updateSidebar();
    
    villagerRate = Math.floor( Math.random() * 10000 + 1 );
    window.setTimeout("updateVillagers()", villagerRate);
}

    // Add/Subtract Villagers
function addFarmer(amount) {
    if (!player.removeVillager("unemployed", amount))
        return;
    player.addVillager("farmer", amount);
    player.numPersimmons -= 2;
    updateSidebar();
}

function addSoldier(amount) {
    if (!player.removeVillager("unemployed", amount))
        return;
    player.addVillager("soldier", amount);
    player.numPersimmons -= 20;
    updateSidebar();
}

function addBlacksmith(amount) {
    if (!player.removeVillager("unemployed", amount))
        return;
    player.addVillager("blacksmith", amount);
    player.numPersimmons -= 50;
    updateSidebar();
}

function addLumberjack(amount) {
    if (!player.removeVillager("unemployed", amount))
        return;
    player.addVillager("lumberjack", amount);
    player.numPersimmons -= 5;
    updateSidebar();
    
}

function subFarmer(amount) {
    if (!player.removeVillager("farmer", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

function subSoldier(amount) {
    if (!player.removeVillager("soldier", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

function subBlacksmith(amount) {
    if (!player.removeVillager("blacksmith", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

function subLumberjack(amount) {
    if (!player.removeVillager("lumberjack", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

    // Add/Subtract items
function addHouse(amount) {
    if (!player.removeItem("wood", amount))
        return;
    player.addItem("house", amount);
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
