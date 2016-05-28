// Animal
var Animal = function(age, name, region, sound) {
	var self = this;

	self.age = parseInt(age, 10) || 0;
	self.name = name || 'undefined';
	self.region = region || 'undefined';
	self.sound = sound || 'some_weird_sound';
}

Animal.prototype = {
	say: function() {
		console.log(this.name + ' says "' + this.sound + '"');
	}
};


// Dog
var Dog = function(age, name, region) {
	var self = this;
	
	if(!(self instanceof Dog)) {
		return new Dog(age, name, region);
	}

	var sound = 'Woof!';

	Animal.call(self, age, name, region, sound);

	return this;
};

Dog.prototype = Object.create(Animal.prototype, {
	goAway: {
		value: function() {
			console.log('Dog ' + this.name + ' ran away...');
		},
		enumerable: true,
		configurable: true,
		writable: true
	}
});

Dog.prototype.constructor = Dog;


// Cat
var Cat = function(age, name, region) {
	var self = this;

	if(!(self instanceof Cat)) {
		return new Cat(age, name, region);
	}

	var sound = 'Meowww';

	Animal.call(self, age, name, region, sound);

	return this;
};

Cat.prototype = Object.create(Animal.prototype, {
	goAway: {
		value: function() {
			console.log('Cat ' + this.name + ' looked at you with no motion...');
		},
		enumerable: true,
		configurable: true,
		writable: true
	}
});


// Woodpecker
var Woodpecker = function(age, name, region) {
	var self = this;

	if(!(self instanceof Woodpecker)) {
		return new Woodpecker(age, name, region);
	}

	var sound = 'Tap! Tap! Tap!';

	Animal.call(self, age, name, region, sound);

	return this;
};

Woodpecker.prototype = Object.create(Animal.prototype, {
	goAway: {
		value: function() {
			console.log('Woodpecker ' + this.name + ' flied away...');
		},
		enumerable: true,
		configurable: true,
		writable: true
	}
});


var dog = new Dog(4, 'Reks', 'Ukraine');
var cat = new Cat(1, 'Barsik', 'Ukraine');
var woodpecker = new Woodpecker(3, 'Rio', 'Ukraine');

dog.say();
cat.say();
woodpecker.say();
