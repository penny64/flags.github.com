Ship.prototype.think = function(){
	this.hover([player.x, player.y]);
}

Ship.prototype.maintain_speed = function(speed){
	var next_pos = get_predicted_destination([this.x, this.y], [this.x_velocity, this.y_velocity], 1)[0];
	
	var _current_speed = distance([this.x, this.y], next_pos);
	
	if (_current_speed >= 10){
		this.thrust_direction=-1;
		return false;
	}
	
	var _projected_rad = this.direction*(Math.PI/180);
	var _projected_x_velocity = Math.cos(_projected_rad)*this.speed;
	var _projected_y_velocity = Math.sin(_projected_rad)*this.speed;
	
	var is_moving_towards;
	var with_current_velocity = get_predicted_destination([this.x, this.y], [_projected_x_velocity, _projected_y_velocity], 10);
	var with_projected_velocity = get_predicted_destination([this.x, this.y], [this.x_velocity, this.y_velocity], 10);
	
	var _best_distance = 0;
	var _missed_by = 0;
	var _dist;
	for (var i=0;i<with_current_velocity.length;i++){
		_dist = distance(with_current_velocity[i], with_projected_velocity[i]);
		
		if (_dist<_best_distance){
			_best_distance = dist;
		} else {
			_missed_by += 1;
		}
	}
	
	if (_missed_by>=10){
		var direction_mod = 1;
	} else {
		var direction_mod = -1;
	}
	
	if (_current_speed < speed){
		this.thrust_direction=1*direction_mod;
	} else if (_current_speed > speed+1) {
		this.thrust_direction=-1*(direction_mod);
	} else {
		this.thrust_direction=0;
		return true;
	}
	
	return false;
}

Ship.prototype.is_facing = function(position){
	var direction = direction_to([this.x, this.y], position);
	
	if (this.direction<direction-this.turn_speed || this.direction>direction+this.turn_speed){
		return false;
	}
	
	return true;
}

Ship.prototype.face_position = function(position){
	var direction = direction_to([this.x, this.y], position);
	
	if (this.direction<direction-this.turn_speed){
		this.turn = 1;
	} else if (this.direction>direction+this.turn_speed){
		this.turn = -1;
	} else {
		return true;
	}
	
	return false;
}

Ship.prototype.forward = function(){
	this.thrust_direction = 1;
}

Ship.prototype.go_to = function(position){
	var _distance;
	var _overshot_by = 0;
	var _path = get_predicted_destination([this.x, this.y], [this.x_velocity, this.y_velocity], 10);
	
	_last_distance = 99999
	for (var index in _path){
		_distance = distance(position, _path[index]);
		
		if (_distance<_last_distance){
			_last_distance = _distance;
		} else if (_last_distance > 32) {
			_overshot_by += 1;
		}
	}
	
	var facing = this.is_facing(position);
	
	if (_overshot_by>=7){
		if (!facing){
			//this.maintain_speed(1);
			this.face_position(position);
		} else {
			if (_overshot_by>=9){
				//this.forward();
				this.maintain_speed(4);
			} else {
				this.maintain_speed(2);
			}
		}
		console.log(_overshot_by);
	} else {
		if (_last_distance<=10){
			//this.maintain_speed(2);
			console.log(_overshot_by);
		} else {
			//this.maintain_speed(4);
			console.log(_overshot_by);
		}
	}
}

Ship.prototype.hover = function(position){
	//this.maintain_speed(6);
	//this.face_position([0, 0]);
	this.go_to(position);
}
