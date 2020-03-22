'use strict'

class Dot {
	constructor(canvas, size, infected) {
		this.pos = startLocation(canvas.x, canvas.y)
		this.speed = randCoordinate()
		this.direction = randCoordinate()
		this.colour = infected ? color(255, 0, 0) : color(255, 255, 255)
		this.canvas = canvas
		this.size = size
		this.infected = infected
		this.hasBeenInfected = infected
		this.recovery = infected ? generateRecoveryTime() : null
		this.recovered = false
	}

	move() {
		this.checkBoundaries()
		this.pos = new Coordinate(this.pos.x + this.speed.x * this.direction.x, this.pos.y + this.speed.y * this.direction.y)
	}

	checkBoundaries() {
		if (hitBoundary(this, 'x')) {
			this.direction.x *= -1
		}
		if (hitBoundary(this, 'y')) {
			this.direction.y *= -1
		}
	}

	render() {
		ellipse(this.pos.x, this.pos.y, this.size)
	}

	infect() {
		if (!this.hasBeenInfected) {
			this.infected = true
			this.hasBeenInfected = true
			this.colour = color(255, 0, 0)
			this.recovery = generateRecoveryTime()
		}
	}

	hasRecovered() {
		if (this.infected && this.recovery && new Date().getTime() > this.recovery) {
			this.recover()
		}
	}

	recover() {
		this.colour = color(0, 255, 0)
		this.infected = false
		this.recovered = true
	}


}

function generateRecoveryTime() {
	return new Date().getTime() + rand(10000)
}

function hitBoundary(dot, axis) {
	return dot.pos[axis] > dot.canvas[axis] - dot.size || dot.pos[axis] < dot.size 
}

function startLocation(x, y) {
	return new Coordinate(randRange(x, 5), randRange(y, 5))
}

function randRange(max, min) {
	return Math.ceil(Math.random() * (max - min) + min)
}

function rand(constraint) {
	return Math.ceil(Math.random() * constraint)
}

function randCoordinate() {
	return new Coordinate(rand(2), rand(2))
}
