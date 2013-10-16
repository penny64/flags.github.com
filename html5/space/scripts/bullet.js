function _bullet(entity, x, y, direction, speed){
	entity.x = x;
	entity.y = y;
	entity.x_velocity = 0;
	entity.y_velocity = 0;
	entity.direction = direction;
	entity.speed = speed;
	entity.draw = draw_bullet;
	entity.tick = tick_bullet;
	entity._clean = false;
	
	level.register_entity(entity);
}

function Photon(x, y, direction, speed){
	_bullet(this, x, y, direction, speed);
}

function tick_bullet(entity){
	var rad = (entity.direction+90)*(Math.PI/180);
	
	//entity.speed *= ent.friction;
	
	entity.x_velocity = Math.cos(rad)*entity.speed;
	entity.y_velocity = Math.sin(rad)*entity.speed;
	
	entity.x += entity.x_velocity;
	entity.y += entity.y_velocity;
	
	if (entity.speed<0.1){
		entity._clean = true;
	}
	
	//if (entity.x<=-8 || entity.x>=648 || entity.y<=-8 || entity.y>=488){
	//	entity._clean = true;
	//}
	collision(entity);
}

function draw_bullet(entity){
	var c2 = document.getElementById('gamewindow').getContext('2d');
	var rad = (entity.direction+90)*(Math.PI/180);
	var size = 8;
	
	c2.save();
	c2.fillStyle = '#555555';
	
	c2.beginPath();

	c2.translate(entity.x, entity.y);
	c2.moveTo(0, 0)
	c2.rotate(rad);
	c2.lineTo(size, 0);
	c2.closePath();
	
	c2.strokeStyle = '#333333';
	c2.lineWidth = 2;
	c2.stroke();
	c2.restore();
}
