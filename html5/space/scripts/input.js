function setup_input(){
	document.addEventListener("keydown", keydown, false);
	document.addEventListener("keyup", keyup, false);
}

function keydown(e)
{
	if (!e) e= event;
	
	if (e.keyCode==37){
		player.turn = -1;
	}
	
	if (e.keyCode==39){
		player.turn = 1;
	}
	
	if (e.keyCode==38){
		player.thrust_direction = 1;
	}
	
	if (e.keyCode==40){
		player.thrust_direction = -1;
	}
	
	console.log(e.keyCode);
}

function keyup(e)
{
	if (!e) e= event;
	
	if (e.keyCode==37 && player.turn == -1){
		player.turn = 0;
	}
	
	if (e.keyCode==39 && player.turn == 1){
		player.turn = 0;
	}
	
	if (e.keyCode==38 || e.keyCode==40){
		player.thrust_direction = 0;
	}
}
