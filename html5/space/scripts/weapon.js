function _weapon(entity, x, y){
	entity.x = x;
	entity.y = y;
	entity.anchor = [0, 0];
	entity.parent = null;
	entity.firing = false;
	entity.direction = 0;
	
	level.register_entity(entity);
}

function tick(entity){
	if (entity.parent){
		entity.x = entity.parent.x;
		entity.y = entity.parent.y;
	}
	
	if (entity.fire_rate>0){
		entity.fire_rate -= 1;
		return false;
	}
	
	if (!entity.firing){
		return false;
	}
	
	if (!entity.shots_per_interval){
		entity.fire_rate = entity.fire_rate_max;
		entity.repeat_delay = 0;
		entity.shots_per_interval = entity.shots_per_interval_max;
		entity.firing = false;
		return false;
	}
	
	if (entity.repeat_delay>0){
		entity.repeat_delay -= 1;
		return true;
	}else{
		new Particle(entity.x, entity.y, entity.parent.direction+(entity.direction+90), 10);
		
		entity.shots_per_interval--;
		entity.repeat_delay = entity.repeat_delay_max;
		
		return true;
	}
}

function fire(entity){
	if (entity.fire_rate > 0){
		return false;
	}
	
	entity.firing = true;
	console.log(entity.firing);
}

function single_shot(x, y){
	_weapon(this, x, y)
	
	this.fire_rate_max = 15;
	this.fire_rate = 0;
	this.shots_per_interval_max = 3;
	this.shots_per_interval = this.shots_per_interval_max
	this.repeat_delay_max = 6;
	this.repeat_delay = 0;
}

function draw_entity(entity){
	var c2 = document.getElementById('gamewindow').getContext('2d');
	var rad = (entity.direction+90)*(Math.PI/180);
	var size = 8;
	
	c2.save();
	c2.fillStyle = '#555555';
	c2.beginPath();
	
	if (entity.parent){
		var parent_rad = (entity.parent.direction+90)*(Math.PI/180);
		c2.translate(entity.parent.x, entity.parent.y);
		c2.rotate(parent_rad);
	}else{
		c2.translate(entity.x, entity.y);
	}
	
	c2.arc(entity.anchor[0]-size/2, entity.anchor[1]-size/2, size, 0, 2*Math.PI);
	
	c2.closePath();
	c2.fill();
	
	c2.beginPath();
	c2.moveTo(size, 0)

	//turret
	c2.restore();
	c2.save();

	c2.rotate(rad);
	c2.translate(10,20);
	c2.lineTo(size+15, 0);
	c2.closePath();
	
	c2.strokeStyle = '#333333';
	c2.stroke();
	c2.restore();
}
