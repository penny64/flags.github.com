function Ship(x, y, speed, player){
	this.x = x;
	this.y = y;
	this.player = player;
	this.speed = speed;
	this.x_velocity = 0;
	this.y_velocity = 0;
	this.direction = 0;
	this.turn = 0;
	this.turn_speed = 5;
	this.thrust_direction = 0;
	this.shooting = false;
	this.attachments = {};
	this.size = 5
	this._A_ID = 0;
}

Ship.prototype.move = function(){
	if (this.shooting){
		this.shoot();
	}
	if (this.turn == -1){
		this.direction -= this.turn_speed;
	} else if (this.turn == 1){
		this.direction += this.turn_speed;
	}
	
	if (this.direction > 360){
		this.direction = 0;
	}else if (this.direction<0){
		this.direction = 360;
	}
	
	if (this.thrust_direction == 1){
		this.thrust(this.speed)
	} else if (this.thrust_direction == -1){
		this.thrust(-this.speed)
	}
	
	this.x += this.x_velocity;
	this.y += this.y_velocity;
}

Ship.prototype.attach_entity = function(entity, x, y){
	entity.parent = this;
	entity.anchor = [x, y];
	this._A_ID++;
	
	this.attachments[this._A_ID] = {"entity": entity, "anchor": [x, y]};
}

Ship.prototype.thrust = function(speed){
	var rad = this.direction*(Math.PI/180)
	
	this.x_velocity += Math.cos(rad)*speed;
	this.y_velocity += Math.sin(rad)*speed;
	
	if (speed > 0){
		new Particle(this.x, this.y, this.direction-180, 7);
	}else{
		new Particle(this.x, this.y, this.direction, 7);
	}
}

function collision(entity){
	if (entity.x >= 660) {
		entity.x = 0;
	} else if (entity.x < -20) {
		entity.x = 660;
	}
	
	if (entity.y > 500) {
		entity.y = -20;
	} else if (entity.y < -20) {
		entity.y = 500;
	}
}

Ship.prototype.shoot = function(){
	for (var key in this.attachments){
		fire(this.attachments[key]["entity"]);
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
	c2.moveTo(0, -this.size);
	c2.lineTo(this.size, this.size);
	c2.lineTo(-this.size, this.size);
	c2.closePath();
	c2.fill();
	
	c2.restore();
}
