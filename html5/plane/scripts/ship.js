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
	
	var next_pos = [this.x+this.x_velocity, this.y+this.y_velocity];
	var velocity = Math.abs(next_pos[0]-this.x)+Math.abs(next_pos[1]-this.y);
	var turn_rate = (velocity-2);
	
	if (turn_rate<0){
		turn_rate = 0;
	}
	
	if (this.turn == -1){
		if ((this.direction<=360 && this.direction>=270) || this.direction<=90){
			this.direction -= this.turn_speed*turn_rate/15;
		}else{
			this.direction -= this.turn_speed*turn_rate/12;
		}
	} else if (this.turn == 1){
		if ((this.direction<=360 && this.direction>=270) || this.direction<=90){
			this.direction += this.turn_speed*turn_rate/12;
		}else{
			this.direction += this.turn_speed*turn_rate/15;
		}
	}
	
	if (this.direction > 360){
		this.direction = 0;
	}else if (this.direction<0){
		this.direction = 360;
	}
	
	var next_pos = [this.x+this.x_velocity, this.y+this.y_velocity];
	var theta = Math.atan2((this.y-next_pos[1]), (next_pos[0]-this.x));
		
	if (theta < 0){
		theta += 2 * Math.PI;
	}
	
	var moving_in_direction = 360-(theta * (180/Math.PI));
	
	if (moving_in_direction != this.direction){
		this.thrust(0.5);
	}
	
	//if (this.thrust_direction == 1){
	//	this.thrust(this.speed)
	//}else{
	//	this.thrust(0)
	//}
		
	//}// else if (this.thrust_direction == -1){
	//	this.thrust(-this.speed)
	//}
	
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
	var rad = this.direction*(Math.PI/180);
	var next_pos = [this.x+this.x_velocity, this.y+this.y_velocity];
	var velocity = Math.abs(next_pos[0]-this.x)+Math.abs(next_pos[1]-this.y);
	var fall_rate = 1-(velocity/10);
	
	if (fall_rate<0){
		fall_rate = 0;
	}
	
	this.x_velocity += Math.cos(rad)*(this.speed*speed);
	this.y_velocity += Math.sin(rad)*(this.speed*speed);
	this.y_velocity += fall_rate
	
	if (this.x_velocity>10){
		this.x_velocity=10;
	} else if (this.x_velocity<-10){
		this.x_velocity=-10;
	}
	
	if (this.y_velocity>10){
		this.y_velocity=10;
	} else if (this.y_velocity<-10){
		this.y_velocity=-10;
	}  
	
	//if (speed > 0){
	new Particle(this.x, this.y, this.direction-180, 2);
	//}else{
	//	new Particle(this.x, this.y, this.direction, 7);
	//}
}

function collision(entity){
	if (entity.x >= 1024) {
		entity.x = 0;
	} else if (entity.x < -20) {
		entity.x = 660;
	}
	
	if (entity.y > 480) {
		entity.y = -20;
	} else if (entity.y < -20) {
		entity.y = 500;
	}
	
	if (entity.y >= 450) {
		if (entity.y_velocity>7){
			console.log(entity.y_velocity)
		} else {
			entity.y_velocity = 0
		}
	}
	
	delete entity
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
	
	c2.strokeStyle = '#555555'
	c2.fillStyle = '#555555';
	c2.beginPath();
	c2.moveTo(0, -this.size);
	c2.lineTo(this.size, this.size);
	c2.lineTo(-this.size, this.size);
	c2.closePath();
	c2.fill();
	c2.stroke();
	
	c2.restore();
	
	var next_pos = [this.x+this.x_velocity*5, this.y+this.y_velocity*5];
	c2.strokeStyle = 'red'
	c2.beginPath();
	c2.moveTo(this.x, this.y);
	c2.lineTo(next_pos[0], next_pos[1]);
	c2.closePath();
	c2.stroke();
}
