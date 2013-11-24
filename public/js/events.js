function spontaneous()
{
	var affected_people = 11;
	alert("A spontaneous combustion disease ravages your town. You loose people.");
	if(numunemployed >= affected_people){
	numunemployed = numumemployed - affected_people;}
	else if (numunemployed < affected people) 
	{
		var x = affected_people - numunemployed;
		if(numfarmer - x >= 0)
		{
			numfarmer = numfarmer - x;
		}
		else
		{
			x = x - numfarmer;
			numfarmer = 0;
			if(numsoldier - x >= 0)
			{
				numsoldier = numsoldier - x;
			}
			else
			{
				x = x - numsoldier;
				numsoldier = 0;
				if(numblacksmith - x >= 0)
				{
					numblacksmith = numblacksmith - x;
				}
				else{numblacksmith = 0};
			}
		}
		numunemployed = 0;
	}
}

function raid() {
    toConsole( "A group of Bandits attacked! They're after your persimmons!" );    
    var casualties = 10;
    var persimmonsLost = 100;
    if ( player.getVllagerCount("soldier") < 5 ) {
        player.numPersimmons -= persimmonsLost;
        toConsole( "You didn't have enough soldiers to defend, you lost" + persimmonsLost + " persimmons");
    }
    else if ( player.getVillagerCount("soldier") == 10 ) {
        player.numPersimmons = 0;
        toConsole( "You don't have ANY soldiers, you lost all your persimmons");
    } 
    else {
        toConsole( "You successfully defended against the attack!" );
    }        
}


