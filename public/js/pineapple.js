var clicks = JSON.parse(localStorage.getItem("ASDF")) || 0;
var name;
var number;


function myFunction(){
	name = prompt("Enter a Name");
	//document.getElementById("Name").innerHTML = (name);
	$('#Name').text (name);
	number = prompt("Enter a Number");	
	$('#Age').text (number.toString());
}
function clicker(){
	$('#clickSpot').text ("Persimmons: " + clicks.toString());
	clicks = clicks + 1;
	localStorage.setItem("ASDF", clicks);

	window.setTimeout("clicker()", 1000);
}
function shower(){
	var temp = prompt("Enter something");
	localStorage.setItem('click', temp);
}
function reset(){
	clicks = 0;
	localStorage.setItem("ASDF", clicks);
}
function disable(){
	if($('#testButton1').prop("disabled"))
		$('#testButton1').prop("disabled", false);
	else 
		$('#testButton1').prop("disabled", true);
}
function hide(){
	$('#testButton2').toggle();
}
function hide1s(){
	$("#1sHider").toggle();
		setTimeout(function(){
			$("#1sHider").toggle();
		}, 1000);
}

