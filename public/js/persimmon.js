var persimmonRate = 10000;
var villagerRate = 10000;
var itemRate = 1000;
var consumptionRate = 30000;
var randomEventRate = 100000;
var citizensPerHouse = 3;

var lineLimit = 9;

// New Player
var player = new player();
var townMap = new town();
var townMap2 = new town();
var currMap = townMap;
var toggleTownMap = false;

var asciiHouse = new house();
var asciiHouse2 = new house2();
var asciiTree = new tree();
var asciiFarm = new farm();

/*
for (var i = 0; i < 20; ++i) {
    var ran = Math.random();
    if (ran > 0.4) {
        var ranHouse = Math.random();
        if (ranHouse > 0.5) {
            townMap.addAsciiObject( asciiHouse );
            townMap2.addAsciiObject( asciiHouse2 );
        }
        else {
            townMap.addAsciiObject( asciiHouse2 );
            townMap2.addAsciiobject( asciiHouse );
        }
    }
    else if (ran > 0.2) {
        townMap.addAsciiObject( asciiFarm );
        townMap2.addAsciiObject( asciiFarm );
    }
    else {
        townMap.addAsciiObject( asciiTree );
        townMap2.addAsciiObject( asciiTree );
    }
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
    if (player.items[i].item == "house")
        player.items[i].amount = JSON.parse(
                localStorage.getItem(player.items[i].item) || 2);
}

function clearHelpText() {
    var help = $( '#helpText' );
    help.html("");
}

function persimmonTab() {
    clearHelpText();
    var content = $( '#mainContent' );
  
    if (currMap == townMap) currMap = townMap2;
    else currMap = townMap;

    var text = currMap.map();

    content.html("<p id='townMap'>" + text + "</p>");
}

function villageTab () {
    clearHelpText();
    $( '#helpText' ).html("<br>" + "<strong>" + "Manage your resources" + "</strong>");
    var content = $( '#mainContent' );
    content.load("village.html");
}

function warTab() {
    clearHelpText();
    var content = $( '#mainContent' );
    content.load("war.html");
}

function settingsTab() {
    clearHelpText();
    $( '#helpText' ).html("<br>" + "<strong>" + "Game Settings" + "</strong>");
    var content = $( '#mainContent' );
    content.load("settings.html");
}

function giveWood() {
    player.addItem("wood", 1000);
    updateSidebar();
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
    sidebarContent += "<strong>";
    for (var i = 0; i < items.length; ++i) {
        sidebarContent = sidebarContent + items[i].value + " " 
                                        + items[i].item + "<br>";
    }

    sidebarContent += "<hr>";

    for (var i = 0; i < player.items.length; ++i) {
        sidebarContent = sidebarContent + player.items[i].amount + " " 
                                        + player.items[i].item + "<br>";
    }

    sidebarContent += "<hr>";

    for (var i = 0; i < player.villagers.length; ++i) {
        sidebarContent = sidebarContent + player.villagers[i].amount + " "
                                        + player.villagers[i].job + "<br>";
    }

    sidebarContent += "</strong>";

    $( '#sidebar' ).html(sidebarContent);
}

function updatePersimmon() {
    player.numPersimmons += player.getItemCount("tree") || 1;
    player.numPersimmons += player.getVillagerCount("farmer");
    if (player.getVillagerCount("farmer") > 0) toConsole("You farmed some persimmons");
    else if (player.getItemCount("tree") > 0)
        toConsole("You found some persimmons");
    else 
        toConsole("You find a persimmon");
    
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
    var villagerCount = 0;
    var newVillagers = false;

    for (var i = 0; i < player.villagers.length; ++i)
        villagerCount += player.villagers[i].amount;

    var amount = 1;
    if (villagerCount >= player.getItemCount("house") * citizensPerHouse) {
        amount = 0;
    }

    var loseChance = 10;
    var gainChance = 50;
    var newVillagerChance = Math.floor(Math.random() * 100 + 1);
    
    if (newVillagerChance >= gainChance) {
        player.addVillager("unemployed", amount);
        if (amount != 0)
            toConsole("Some wanderers have settled in your town.");
    }
    else if (newVillagerChance <= loseChance)
        player.removeVillager("unemployed", amount);

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
    if (player.numPersimmons < 5 ) {
        toConsole( "You need at least 5 persimmons for a farmer." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }

    player.addVillager("farmer", amount);
    player.numPersimmons -= 5;
    updateSidebar();
}

function addSoldier(amount) {
    if (player.numPersimmons < 50 ) {
       toConsole( "You need at least 50 persimmons for a soldier." );
       return;
    }
    if (!player.removeVillager("unemployed", amount)) {
       toConsole( "You need at least 1 unemployed villager." );
       return;
    }

    player.addVillager("soldier", amount);
    player.numPersimmons -= 50;
    updateSidebar();
}

function addBlacksmith(amount) {
    if (player.numPersimmons < 30 ) {
        toConsole( "You need at least 30 persimmons for a blacksmith." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }


    player.addVillager("blacksmith", amount);
    player.numPersimmons -= 30;
    updateSidebar();
}

function addMiner(amount) {
    if (player.numPersimmons < 30 ) {
        toConsole( "You need at least 30 persimmons for a miner." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );
        return;
    }


    player.addVillager("miner", amount);
    player.numPersimmons -= 30;
    updateSidebar();
}

function addLumberjack(amount) {
    if (player.numPersimmons < 15 ){
        toConsole( "You need at least 15 persimmons for a lumberjack." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }

    player.addVillager("lumberjack", amount);
    player.numPersimmons -= 15;
    updateSidebar();
}

function addScientist(amount) {
    if (player.numPersimmons < 200 ){
        toConsole( "You need at least 200 persimmons for a scientist." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }

    player.addVillager("scientist", amount);
    player.numPersimmons -= 200;
    updateSidebar();
}

function addGeneral(amount) {
    if (player.numPersimmons < 500 ){
        toConsole( "You need at least 500 persimmons for a general." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
        return;
    }

    player.addVillager("general", amount);
    player.numPersimmons -= 500;
    updateSidebar();
}

function addPolitician(amount) {
    if (player.numPersimmons < 500 ){
        toConsole( "You need at least 500 persimmons for a scientist." );
        return;
    }
    if (!player.removeVillager("unemployed", amount)) {
        toConsole( "You need at least 1 unemployed villager." );  
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

function addTree(amount) {
    if (player.numPersimmons < 200 ) {
        toConsole( "Need 200 persimmons" );
        return;
    }

    player.numPersimmons -= 200;

    player.addItem("tree", amount);
    townMap.addAsciiObject( asciiTree );
    townMap2.addAsciiObject( asciiTree );
    updateSidebar();
}

function addHouse(amount) {
    if (player.getItemCount("wood") < 200*player.getItemCount("house") ) {
        toConsole( "Need " + 200*player.getItemCount("house") + " wood" );
        return;
    }
    if (!player.removeItem("wood", 200*player.getItemCount("house"))) {
        return;
    }
    player.addItem("house", amount);
    townMap.addAsciiObject( asciiHouse );
    townMap2.addAsciiObject( asciiHouse2 );
    toConsole( "Built a house. It can shelter 3 people." );
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
    if (player.getItemCount("wood") < 700 ) {
        toConsole( "Need 700 wood." );
        return;
    }
    if (!player.removeItem("wood", 700))
        return;

    townMap.addAsciiObject( asciiFarm );
    townMap2.addAsciiObject( asciiFarm );

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
    if (player.getItemCount("wood") < 1000 ) {
        toConsole( "Need 1000 wood" );
        return;
    }
    if (!player.removeItem("wood", 1000))
        return;

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
        if (player.items[i].item == "house")
            player.items[i].amount = 2;
        else player.items[i].amount = 0;
    }

    //Clear console...
    for (var i = 0; i < lineLimit + 2; ++i)
        toConsole("");

    updateSidebar();
    save();
    main();
}

function eatPersimmon(amount) {
    if ( player.numPersimmons < amount ) {
        toConsole( "Not enough persimmons" );
        return;
    }
       
    player.numPersimmons -= amount;
    if (amount == 1)
        toConsole( "You nibble on a persimmon. It tastes awful" );
    else if (amount == 10)
        toConsole( "You dine on 10 persimmons. They taste awful" );
    else
        toConsole( "You devour 100 persimmons. They taste awful" );

    updateSidebar();
}

function eventFortune(){
     toConsole("Fortune has smiled upon you, adding persimmons.");
     player.numPersimmons = player.numPersimmons*2;
}

function eventNaturalDisaster(){
     var temp = Math.random();
     var event;
     switch(Math.ceil(temp*100)%3){
          case 0: event = "tornado";
          case 1: event = "earthquake";
          case 2: event = "flood";
     }
     toConsole("Unfortunately, a " + event + " has struck destroying some persimmon yields"); 
     player.numPersimmons -= (Math.ceil(temp*player.getItemCount("house")/10));
}

var gameInitEvents = false;
function eventNothing(){
    if(gameInitEvents) toConsole("The weather is fair.");
    gameInitEvents = true;
}

function eventBats(){
     toConsole("A fruit bat has made your village your home. You allow it to eat persimmons because it is cute.");
     player.numPersimmons -= 2;
}    

function randomEventHandler(){
     var naturalDisasterChance = .1;
     var fortuneChance = .2;
     var merchantChance = .7;
     var temp = Math.random() * 100; 

     if( temp > 90) // 10% chance of natual disaster event
          eventNaturalDisaster();
     else if( temp >= 70 && temp < 90)
          eventFortune(); // 40% chance of good fortune
     else if( temp >= 1 && temp < 70)
          eventNothing();
     else if( temp >= 0 && temp < 1)
          eventBats();
}

function updateEvents() {
    var eventRate = Math.random() * 100;
    randomEventHandler();
    window.setTimeout("updateEvents()", eventRate + randomEventRate);
}

function save() {
    localStorage.setItem("numPersimmons", player.numPersimmons);
    player.saveVillagers();
    player.saveItems();
    window.setTimeout("save()", 30000);
}

function shuffle(array) {
var currentIndex = array.length
, temporaryValue
, randomIndex
;

// While there remain elements to shuffle...
while (0 !== currentIndex) {

// Pick a remaining element...
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;

// And swap it with the current element.
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
    }

      return array;
}

function gameStart() {
    var itemArray = [];

    // Populate map
    for (var i = 0; i < player.getItemCount("tree"); ++i) {
        itemArray.push(asciiTree);
    }
    for (var i = 0; i < player.getItemCount("house"); ++i) {
        itemArray.push(asciiHouse);
    }
    for (var i = 0; i < player.getItemCount("farm"); ++i) {
        itemArray.push(asciiFarm);
    }

    shuffle(itemArray);

    for (var i = 0; i < itemArray.length; ++i)
    {
        townMap.addAsciiObject(itemArray[i]);
        townMap2.addAsciiObject(itemArray[i]);
    }

    updatePersimmon();
    updateItems();
    updateVillagers();
    updateConsumption();
    updateEvents();
    save();
}

function main() {
    toConsole("Welcome to Persimmons...");

    window.setTimeout( function () {
        toConsole("Persimmons bring happiness...");
        window.setTimeout( function() { 
            toConsole("Are you looking for persimmons...?");
            window.setTimeout( function() {
                updatePersimmon();
                window.setTimeout( function() {
                    toConsole("There are " + player.getItemCount("house").toString() + " houses");
                    gameStart();
                }, 3000);
            }, 3000);
        }, 3000);
    }, 3000);
}
