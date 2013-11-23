function playerCrab(character_number, persimmon_count)
{
    this.crab = true;
    this.monkey = false;
    this.persimmon_count = persimmon_count;
    this.change_persimmon_count = change_persimmon_count();
    
    function change_persimmon_count(persimmons)
    {
        this.persimmon_count = persimmons;
    }
}

function playerMonkey(character_number, persimmon_count)
{
    this.crab = false;
    this.monkey = true;
    this.persimmon_count = persimmon_count;
    this.change_persimmon_count = change_persimmon_count;
   
    function change_persimmon_count(persimmons)
    {
        this.persimmon_count = persimmons;
    }
}
