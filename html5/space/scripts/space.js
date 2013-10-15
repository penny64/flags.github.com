function World(){
	this._E_ID = 0;
	
	this.entities = {};
}

World.prototype.register_entity = function(entity){
	this._E_ID++;
	
	this.entities[this._E_ID] = entity;
}

World.prototype.tick = function(){
	for (var key in this.entities){
		tick(this.entities[key]);
	}
}

World.prototype.draw = function(){
	for (var key in this.entities){
		draw_entity(this.entities[key]);
	}
}
