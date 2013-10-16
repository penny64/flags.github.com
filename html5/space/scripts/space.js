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
		this.entities[key].tick(this.entities[key]);
		
		if (this.entities[key]._clean){
			delete this.entities[key];
			console.log("del");
		}
	}
}

World.prototype.draw = function(){
	for (var key in this.entities){
		this.entities[key].draw(this.entities[key]);
	}
}
