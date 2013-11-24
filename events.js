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