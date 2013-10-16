function Particle(x, y, direction, speed){
	_P_ID += 1;
	
	this.size = 4;
	this.x = x+this.size/2+Math.floor((Math.random()*5)+1);
	this.y = y+this.size/2+Math.floor((Math.random()*5)+1);
	this.direction = direction+Math.floor((Math.random()*5)+1)-Math.floor((Math.random()*5)+1);
	this.start_speed = speed;
	this.speed = speed;
	this.friction = 0.98;
	this.id = _P_ID;
	this._clean = false;
	
	particles[_P_ID] = this;
}

Particle.prototype.move = function(){
	var rad = this.direction*(Math.PI/180)
	
	this.speed *= this.friction;
	
	this.x_velocity = Math.cos(rad)*this.speed;
	this.y_velocity = Math.sin(rad)*this.speed;
	
	this.x += this.x_velocity;
	this.y += this.y_velocity;
	
	if (this.speed<0.1){
		this._clean = true;
	}
	
}

Particle.prototype.collisions = function(){
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


Particle.prototype.draw = function(){
	var c2 = document.getElementById('gamewindow').getContext('2d');
	var size = this.size*(this.speed/this.start_speed);
	
	c2.strokeStyle = '#555555';
	c2.beginPath();
	c2.arc(this.x-(size/2), this.y-(size/2), size, 0, 2*Math.PI);
	c2.stroke();
	c2.closePath();
}
