function player()
{
    this.numPersimmons = 0;

    this.items = [
        { item: "house", amount: 0 },
        { item: "wood" , amount: 0 },
        { item: "finger_traps", amount: 0 }
    ];
    
    this.villagers = [
        { job: "unemployed", amount: 0 },
        { job: "farmer", amount: 0 },
        { job: "soldier", amount: 0 },
        { job: "blacksmith", amount: 0},
        { job: "lumberjack", amount: 0}
    ];

    // Add/Remove Item
    this.addItem = function (type, amount) {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].item == type) {
                this.items[i].amount += amount;
                return;
            }
        }
    };

    this.removeItem = function (type, amount) {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].item == type) {
                if (this.items[i].item == type) {
                    this.items[i].amount -= amount;
                    return true;
                } else
                    return false;
            }
        }
        return false;
    };                

    // Add/Remove Villager
    this.addVillager = function (type, amount) {
        for (var i = 0; i < this.villagers.length; ++i) {
            if (this.villagers[i].job == type) {
                this.villagers[i].amount += amount;
                return;
            }
        }
    };

    this.removeVillager = function (type, amount) {
        for (var i = 0; i < this.villagers.length; ++i) {
            if (this.villagers[i].job == type) {
                if (this.villagers[i].amount >= amount) {
                    this.villagers[i].amount -= amount;
                    return true;
                } else
                    return false;
            }
        }
        return false;
    };

    this.getVillagerCount = function (type) {
        for (var i = 0; i < this.villagers.length; ++i) {
            if(this.villagers[i].job == type)
                return this.villagers[i].amount;
        }
    };

    this.saveVillagers = function() {
        for (var i = 0; i < this.villagers.length; ++i) {
            localStorage.setItem(this.villagers[i].job,this.villagers[i].amount);
        }
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
