function player()
{
    this.numPersimmons = 0;

    this.unemployed = 0;
    this.farmer = 0;
    this.soldier = 0;
    this.blacksmith = 0;
    this.lumberjack = 0;
    this.scientist = 0;
	this.general = 0;
	this.politician = 0;

    this.wood = 0;
    this.house = 2;
    this.farm = 0;

    this.items = [
        { item: "wood", amount: 0 },
        { item: "house", amount: 2 },
        { item: "farm", amount: 0 },
    ];
    
    this.villagers = [
        { job: "unemployed", amount: 0 },
        { job: "farmer", amount: 0 },
        { job: "soldier", amount: 0 },
        { job: "blacksmith", amount: 0},
        { job: "lumberjack", amount: 0},
        { job: "general", amount: 0},
		{ job: "politician", amount: 0}
    ];

    this.research = [
        { title: "farm", state: false, descript: "A farm" },
        { title: "l_house", state: false, descript: "Large house" },
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
                if (this.items[i].amount >= amount) {
                    this.items[i].amount -= amount;
                    return true;
                } else
                    return false;
            }
        }
        return false;
    };                

    this.getItemCount = function (type) {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].item == type)
                return this.items[i].amount;
        }
    };

    this.saveItems = function() {
        for (var i = 0; i < this.items.length; ++i) {
            localStorage.setItem(this.items[i].item,this.items[i].amount);
        }
    }   
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
	
	this.getTotalVillagers = function () {
		var temp = 0;
		for( var i = 0; i < this.villagers.length; i++){
			temp += this.villagers[i].amount;
		}
		return temp;
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
