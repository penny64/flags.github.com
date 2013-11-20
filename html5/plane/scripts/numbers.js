function distance(pos1, pos2){
	return Math.abs(pos1[0]-pos2[0])+Math.abs(pos1[1]-pos2[1]);
}

function direction_to(pos1, pos2){
	var theta = Math.atan2((pos1[1]-pos2[1]), -(pos1[0]-pos2[0]));
		
	if (theta < 0){
		theta += 2 * Math.PI;
	}
	
	return theta * (180/Math.PI);
}

function get_predicted_destination(pos, velocity, turns){
	var path = [];
	var _n_x, _n_y;
	
	for (var i=0;i<turns;i++){
		_n_x = pos[0]+velocity[0];
		_n_y = pos[1]+velocity[1];
		
		path.push([_n_x, _n_y]);
	}
	
	return path;
}
