var soldiersSent = 0;
var enemySoldiers = 0;
var restTime = false;
var restRate = 1800000;

function updateArmyMessage() {
    var message = $( '#helpText' );
    var text = "";
    text += "<br><strong>";
    text += "Send soldiers out to conquer and claim more persimmons";
    text += "</strong> <br><br>";
    text += soldiersSent.toString() + " soldiers in the army.";
    
    message.html(text);
}

function buildArmy() {
    if (player.getVillagerCount("soldier") < 1 ) {
        toConsole( "No soldiers available" );
        return;
    }

    soldiersSent++;       
    player.removeVillager("soldier", 1);
    updateSidebar();
    updateArmyMessage();
    return;
}

function reduceArmy() {
    if (soldiersSent < 1 )  {
        return;
    }

    soldiersSent--;
    player.addVillager("soldier", 1);
    updateSidebar();
    updateArmyMessage();
    return;
}  

function raidForPersimmons() {
    
    if (restTime) {
        toConsole( "Your soldiers are resting" );
        return;    
    }

    if (soldiersSent < 1 ) {
        toConsole( "You're not sending any soldiers" );
        return;
    }

    var temp = enemySoldiers;
    var initialSent = soldiersSent;

    toConsole("");
    toConsole( "You send " + JSON.stringify(soldiersSent) + " soldiers");
    toConsole( "The soldiers emark on the journey" );

    enemySoldiers = Math.ceil((player.getVillagerCount("soldier") + soldiersSent) * Math.random());
    temp = enemySoldiers;
    toConsole( "There are " + enemySoldiers + " enemy soldiers!" );

    while (soldiersSent > 0 && enemySoldiers > 0 ) {
        enemySoldiers -= Math.ceil(soldiersSent * Math.random());
        if ( enemySoldiers < 0 )
            break;

        soldiersSent -= Math.ceil(soldiersSent * Math.random());
    }

    if ( soldiersSent > 0 ) {
        temp = 50 * temp;
        player.numPersimmons += temp;
        toConsole( "You lost " + (initialSent - soldiersSent).toString() + " soldiers in battle" );
        toConsole( "Your soldiers won the battle and you gain " + temp + " persimmons" );
        toConsole( "Your soldiers need rest");
        restTime = true;
        updateRest(restRate);
    }
    else {
        toConsole( "Your soldiers perished in the battle and you gain no persimmons" );
    }

    updateArmyMessage();
}

function resetRest() {
    restTime = false;
}

function updateRest(num) {
    if (restTime) 
        window.setTimeout("resetRest()", num)
} 
