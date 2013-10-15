function Ship(x, y, speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.x_velocity = 0;
	this.y_velocity = 0;
	this.direction = 0;
}

Ship.prototype.move = function(){
	this.x += this.x_velocity;
	this.y += this.y_velocity;
}

Ship.prototype.thrust = function(){
	var rad = this.direction*(Math.PI/180)
	
	this.x_velocity += Math.cos(rad)*this.speed;
	this.y_velocity += Math.sin(rad)*this.speed;
	
	new Particle(this.x, this.y, this.direction-180, 10);
}

Ship.prototype.collisions = function(){
	if (this.x >= 660) {
		this.x = 0;
	} else if (this.x < -20) {
		this.x = 660;
	}
	
	if (this.y > 500) {
		this.y = -20;
	} else if (this.y < -20) {
		this.y = 500;
	}
}

Ship.prototype.draw = function(){
	var c2 = document.getElementById('gamewindow').getContext('2d');
	var rad = (this.direction+90)*(Math.PI/180);
	
	c2.save();
	c2.translate(this.x, this.y);
	c2.rotate(rad);
	
	c2.fillStyle = '#555555';
	c2.beginPath();
	c2.moveTo(0, -15);
	c2.lineTo(15, 15);
	c2.lineTo(-15, 15);
	c2.closePath();
	c2.fill();
	
	c2.restore();
}