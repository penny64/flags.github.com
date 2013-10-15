function setup_input(){
	document.addEventListener("keydown", keydown, false);
}

function keydown(e)
{
	if (!e) e= event;
	
	if (e.keyCode==37){
		player.direction-=4;
	} else if (e.keyCode==39){
		player.direction+=4;
	} else if (e.keyCode==38){
		player.thrust();
	}
	
	//console.log(e.keyCode);
}
