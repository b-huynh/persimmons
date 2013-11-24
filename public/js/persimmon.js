var persimmonRate = 3000;

var lineLimit = 5;

var player = new player();
player.numPersimmons = JSON.parse(localStorage.getItem("numPersimmons")) || 0;

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
    
    // Update Villagers
    sidebarContent += this.unemployed.toString() + " " + "unemployed" + "<br>";
    sidebarContent += this.farmer.toString() + " " + "farmer" + "<br>";
    sidebarContent += this.soldier.toString() + " " + "soldier" + "<br>";

    $( '#sidebar' ).html(sidebarContent);
}

function updatePersimmon() {
    player.numPersimmons += 1;
    updateSidebar();
    window.setTimeout("updatePersimmon()", persimmonRate);
}

function updateVillagers() {
    var loseChance = 10;
    var gainChance = 50;
    var newVillagerChance = Math.floor(Math.random() * 100 + 1);
   
    if (newVillagerChance >= gainChance)
        this.villagers.unemployed++;
    else if (newVillagerChance <=  loseChance)
        if (this.villagers.unemployed != 0)
        i   this.villagers.unemployed--;
    var villagersPerHouse = 3;

    
}

function reset() {
    player.numPersimmons = 1;
}

function eatPersimmon() {
    player.numPersimmons -= 1;
    toConsole( "You eat a persimmon. It tastes awful" );
    updateSidebar();
}

function save() {
    localStorage.setItem("numPersimmons", player.numPersimmons);
    window.setTimeout("save()", 30000);
}

function main() {
    console.log("Test test");
    updatePersimmon();
    save();
}
