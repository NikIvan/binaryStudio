var ANIMAL_SOUNDS = {
	Dog: 'Woof!',
	Cat: 'Meowww',
	Woodpecker: 'Tap! Tap! Tap!'
};

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
var Dog = function Dog(age, name, region) {
	var sound = ANIMAL_SOUNDS[arguments.callee.name];
	var dog = Object.create(new Animal(age, name, region, sound));

	dog.goAway = function() {
		console.log('Dog ' + this.name + ' ran away...');
	};

	return dog;
};

// Cat
var Cat = function Cat(age, name, region) {
	var sound = ANIMAL_SOUNDS[arguments.callee.name];
	var cat = Object.create(new Animal(age, name, region, sound));

	cat.goAway = function() {
		console.log('Cat ' + this.name + ' looked at you with no motion...');
	};

	return cat;
};

// Woodpecker
var Woodpecker = function Woodpecker(age, name, region) {
	var sound = ANIMAL_SOUNDS[arguments.callee.name];
	var woodpecker = Object.create(new Animal(age, name, region, sound));

	woodpecker.goAway = function() {
		console.log('Woodpecker ' + this.name + ' flied away...');
	};

	return woodpecker;
};

var dog = new Dog(4, 'Reks', 'Ukraine');
var cat = new Cat(1, 'Barsik', 'Ukraine');
var woodpecker = new Woodpecker(3, 'Rio', 'Ukraine');

dog.say();
cat.say();
woodpecker.say();

var getType = function(animal) {

	switch(animal.sound) {
		case ANIMAL_SOUNDS.Dog:
			return 'Dog';
			break;
		case ANIMAL_SOUNDS.Cat:
			return 'Cat';
			break;
		case ANIMAL_SOUNDS.Woodpecker:
			return 'Woodpecker';
			break;
	}
}

console.log(getType(dog));
console.log(getType(cat));
console.log(getType(woodpecker));

var getTypeMod = function() {
	switch(this.sound) {
		case ANIMAL_SOUNDS.Dog:
			return 'Dog';
			break;
		case ANIMAL_SOUNDS.Cat:
			return 'Cat';
			break;
		case ANIMAL_SOUNDS.Woodpecker:
			return 'Woodpecker';
			break;
	}
}

console.log(getTypeMod.call(dog));
console.log(getTypeMod.call(cat));
console.log(getTypeMod.call(woodpecker));