var persimmonRate = 10000;
var villagerRate = 10000;
var itemRate = 1000;
var consumptionRate = 10000;

var lineLimit = 5;

// New Player
var player = new player();
var townMap = new town();

var asciiHouse = new house();
var asciiTree = new tree();

/*
for (var i = 0; i < 100; ++i) {
    var ran = Math.random();
    if (ran > 0.2)
        townMap.addAsciiObject( asciiHouse );
    else
        townMap.addAsciiObject( asciiTree );
}
*/

//Load existing player from local storage
player.numPersimmons = JSON.parse(localStorage.getItem("numPersimmons")) || 0;

for (var i = 0; i < player.villagers.length; ++i) {
    player.villagers[i].amount = JSON.parse( 
                localStorage.getItem(player.villagers[i].job) || 0);
}
for (var i = 0; i <player.items.length; ++i) {
    player.items[i].amount = JSON.parse(
                localStorage.getItem(player.items[i].item) || 0);
}

function persimmonTab() {
    var content = $( '#mainContent' );
    var home = new house(); 
   
    var text = home.lines.join("<br>");
    text += "<br>";
    text += text + text + text + text + text;
    
    text = "";
    for (var j = 0; j < 30; ++j) {
    for (var i = 0; i < 125; ++i)
        text += "*"; 
    text += "<br>";
    }

    text = townMap.map();

    content.html("<p id='townMap'>" + text + "</p>");
}

function villageTab () {
    var content = $( '#mainContent' );
    content.load("village.html");
}

function toConsole(text) {
    var currentText = $( '#consoleOut' ).html();
   
    currentText = currentText.split("<strong>").join("");
    currentText = currentText.split("</strong>").join("");
    
    var lines = currentText.split("<br>");
    while (lines.length >= lineLimit) {    
        lines.pop();
    }
    
    currentText = lines.join("<br>");

    $( '#consoleOut' ).html( "<strong>" + text + "</strong>" + "<br>" + currentText );
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

    // Research
/*    sidebarContent += "<br>Research<br>";

    for (var i = 0; i < player.research.length; ++i) {
        sidebarContent = sidebarContent + player.research[i].title + " ";
        if (player.research[i].state == true )
            sidebarContent = sidebarContent + ": Complete";
        else
            sidebarContent = sidebarContent + ": Incomplete"
        sidebarContent = sidebarContent + "<br>";                                        
    }
*/
    $( '#sidebar' ).html(sidebarContent);
}

function updatePersimmon() {
    player.numPersimmons += 1;
    player.numPersimmons += player.getVillagerCount("farmer");
    if (player.getVillagerCount("farmer") > 0) toConsole("You found some persimmons.");
    else toConsole("You find a persimmon.");
    
    updateSidebar();
    window.setTimeout("updatePersimmon()", persimmonRate);
}

function updateItems() {
    if ( (player.getVillagerCount("lumberjack")) >= 1 )
        player.addItem("wood", player.getVillagerCount("lumberjack"));
    if ( (player.getVillagerCount("miner")) >= 1 )
        player.addItem("coal", player.getVillagerCount("miner"));

    updateSidebar();

    window.setTimeout("updateItems()", itemRate);
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

function updateConsumption() {
    if (player.numPersimmons <= 0 ) 
        return;
    // Lumberjack
    if (player.getVillagerCount("lumberjack") >= 1 )
        player.numPersimmons -= (3*player.getVillagerCount("lumberjack"));
    // Blacksmith
    if (player.getVillagerCount("blacksmith") >= 1 )
        player.numPersimmons -= (10*player.getVillagerCount("blacksmith"));
    // Soldier
    if (player.getVillagerCount("soldier") >= 1 )
        player.numPersimmons -= (5*player.getVillagerCount("soldier"));
    // Miner
    if (player.getVillagerCount("miner") >= 1 )
        player.numPersimmons -= (7*player.getVillagerCount("miner"));

    // Scientist
    if (player.getVillagerCount("scientist") >= 1 )
        player.numPersimmons -= (50*player.getVillagerCount("scientist"));
    // General
    if (player.getVillagerCount("general") >= 1 )
        player.numPersimmons -= (100*player.getVillagerCount("general"));
    // Politician
    if (player.getVillagerCount("politician") >= 1 )
        player.numPersimmons -= (100*player.getVillagerCount("politician"));

    updateSidebar(); 

    window.setTimeout("updateConsumption()", consumptionRate);
}

    // Adding Villagers
function addFarmer(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }
    if (player.numPersimmons < 5 ) {
        toConsole( "You need at least 5 persimmons for a farmer." );
        return;
    }
    player.addVillager("farmer", amount);
    player.numPersimmons -= 5;
    updateSidebar();
}

function addSoldier(amount) {
    if (!player.removeVillager("unemployed", amount)) {
       toConsole( "You need at least 1 unemployed villager." );
       return;
    }
    if (player.numPersimmons < 50 ) {
       toConsole( "You need at least 50 persimmons for a soldier." );
       return;
    }
    player.addVillager("soldier", amount);
    player.numPersimmons -= 50;
    updateSidebar();
}

function addBlacksmith(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }
    if (player.numPersimmons < 30 ) {
        toConsole( "You need at least 30 persimmons for a blacksmith." );
        return;
    }

    player.addVillager("blacksmith", amount);
    player.numPersimmons -= 30;
    updateSidebar();
}

function addMiner(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }
    if (player.numPersimmons < 30 ) {
        toConsole( "You need at least 30 persimmons for a miner." );
        return;
    }

    player.addVillager("miner", amount);
    player.numPersimmons -= 30;
    updateSidebar();
}

function addLumberjack(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }
    if (player.numPersimmons < 15 ){
        toConsole( "You need at least 15 persimmons for a lumberjack." );
        return;
    }
    player.addVillager("lumberjack", amount);
    player.numPersimmons -= 15;
    updateSidebar();
}

function addScientist(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }
    if (player.numPersimmons < 200 ){
        toConsole( "You need at least 200 persimmons for a scientist." );
        return;
    }
    player.addVillager("scientist", amount);
    player.numPersimmons -= 200;
    updateSidebar();
}

function addGeneral(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }
    if (player.numPersimmons < 500 ){
        toConsole( "You need at least 500 persimmons for a general." );
        return;
    }
    player.addVillager("general", amount);
    player.numPersimmons -= 500;
    updateSidebar();
}

function addPolitician(amount) {
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }
    if (player.numPersimmons < 500 ){
        toConsole( "You need at least 500 persimmons for a scientist." );
        return;
    }
    player.addVillager("politician", amount);
    player.numPersimmons -= 500;
    updateSidebar();
}

    // Subtracting Villagers
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

function subScientist(amount) {
    if (!player.removeVillager("scientist", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

function subGeneral(amount) {
    if (!player.removeVillager("general", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

function subPolitician(amount) {
    if (!player.removeVillager("politician", amount))
        return;
    player.addVillager("unemployed", amount);
    updateSidebar();
}

    // Add/Subtract House
function addHouse(amount) {
    if (!player.removeItem("wood", 200))
        return;
    if (player.getItemCount("wood") < 200 ) {
        toConsole( "Need 200 wood" );
        return;
    }
    player.addItem("house", amount);
    toConsole( "Built a house; it holds 3 citizens" );
    updateSidebar();
}

function subHouse(amount) {
    if (!player.removeItem("house", amount))
        return;
    player.removeItem("house", amount);
    updateSidebar();
}

    // Add/Subtract Farm
function addFarm(amount) {
    if (!player.removeItem("wood", 700))
        return;
    if (player.getItemCount("wood") < 700 ) {
        toConsole( "Need 700 wood" );
        return;
    }
    player.addItem("farm", 1);
    
    updateSidebar();
}

function subFarm(amount) {
    if (!player.removeItem("farm", amount))
        return;
    player.removeItem("farm", amount);

    updateSidebar();
}
    
    // Add/Subtract Factory
function addFactory(amount) {
    if (!player.removeItem("wood", 1000))
        return;
    if (player.getItemCount("wood") < 1000 ) {
        toConsole( "Need 1000 wood" );
        return;
    }
    player.addItem("factory", amount);
    
    updateSidebar();
}

function subFactory(amount) {
    if (!player.removeItem("factory", amount))
        return;
    player.removeItem("factory", amount);

    updateSidebar();
}

    // Research 
function researchCounter(totalTime) {
    totalTime -= player.getVillagerCount("scientist");
    if (totalTime > 0 )
        window.setTimeout("researchCounter(totalTime)", 1000);
    else {      
        toConsole( "Research complete" );
        return;
    }
}

function reset() {
    player.numPersimmons = 0;
    
    for (var i = 0; i < player.villagers.length; ++i) {
        player.villagers[i].amount = 0;
    }

    for (var i = 0; i < player.items.length; ++i) {
        player.items[i].amount = 0;
    }

    updateSidebar();
    save();
}

function eatPersimmon() {
    if ( !(player.numPersimmons > 0) )
        return;
    player.numPersimmons -= 1;
    toConsole( "You eat a persimmon. It tastes awful" );
    updateSidebar();
}

function save() {
    localStorage.setItem("numPersimmons", player.numPersimmons);
    player.saveVillagers();
    player.saveItems();
    window.setTimeout("save()", 30000);
}

function main() {
    console.log("Test test");
    updatePersimmon();
    updateItems();
    updateVillagers();
    updateConsumption();
    save();
}
