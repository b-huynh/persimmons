function player()
{
    this.numPersimmons = 0;

    this.unemployed = 0;
    this.farmer = 0;
    this.soldier = 0;

    this.items = [
        { item: "house", amount: 0 },
    ];
    
    this.villagers = [
        { job: "unemployed", amount: 0 },
        { job: "farmer", amount: 0 },
        { job: "soldier", amount: 0 },
        { job: "blacksmith", amount: 0},
    ];

    this.add
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
