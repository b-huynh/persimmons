<!DOCTYPE html>
<html>
<body>

<script>
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
myMother = new player_1(1,10);
myMother.change_persimmon_count(15);
var a = myMother.persimmon_count.toString();
document.write(a);
</script>

</body>
</html>
