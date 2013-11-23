function player_1(character_number, persimmon_count)
{
    this.crab = false;
    this.monkey = false;
    this.persimmon_count = persimmon_count;
    if(character_number == 1)
    {
        this.monkey = true;
    }
    else 
    {
        this.crab = true;
    }

    this.change_persimmon_count = change_persimmon_count();
    
    function change_persimmon_count(persimmons)
    {
        this.persimmon_count = persimmons;
    }
}

function player_2(character_number, persimmon_count)
{
    this.crab = false;
    this.monkey = false;
    this.persimmon_count = persimmon_count;
    if(character_number == 1)
    {
        this.monkey = true;
    }
    else 
    {
        this.crab = true;
    }
    this.change_persimmon_count = change_persimmon_count;
   
    function change_persimmon_count(persimmons)
    {
        this.persimmon_count = persimmons;
    }
}
