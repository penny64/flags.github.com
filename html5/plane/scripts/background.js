function DrawStarfield(stars){
	var c2 = document.getElementById('gamewindow').getContext('2d');
	
	for (var s in stars){
		c2.strokeStyle = '#999999';
		c2.beginPath();
		c2.arc(stars[s][0]-(stars[s][2]/2), stars[s][1]-(stars[s][2]/2), stars[s][2], 0, 2*Math.PI);
		c2.stroke();
		c2.closePath();
	}
	
	c2.fillStyle = '#999999';
	c2.fillRect(0,460,1024,32);
}
