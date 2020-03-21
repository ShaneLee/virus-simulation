'use strict'

const width = window.innerWidth
const height = 800

const population = 100

const dots = []
const infected = []

function setup() {
	createCanvas(width, height)
	createPopulation()
}

function draw() {
	background(51)
	checkComplete()
	moveDots()
	updateText()
}

function updateText() {
	select('#virus').html(`Infected: ${infected.length}`)
	select('#healthy').html(`Healthy: ${dots.length - infected.length}`)
	select('#total').html(`Total: ${dots.length}`)
}

function checkComplete() {
	if (dots.length - infected.length == 0) {
		noLoop()
	}
}

function moveDots() {
	for (const dot of dots) {
		dot.move()
		fill(dot.colour)
		dot.render()
		for (const dot2 of dots) {
			checkCollision(dot, dot2)
		}
	}
}

function checkCollision(dot, dot2) {
	if (dist(dot.pos.x, dot.pos.y, dot2.pos.x, dot2.pos.y) < dot.size 
		&& isOneInfected(dot, dot2)) {
		dot.infect()
	 	dot2.infect()
		infected.push(dot.infected)
	}
}

function isOneInfected(dot, dot2) {
	return (dot.infected || dot2.infected) && !areBothInfected(dot, dot2)
}

function areBothInfected(dot, dot2) {
	return dot.infected && dot2.infected
}

function createPopulation() {
 	for (let i = 1; i < population; i++) {
		dots.push(new Dot(new Coordinate(width, height), 16, false))
	}
	createCarrier()
}

function createCarrier() {
	const carrier = new Dot(new Coordinate(width, height), 16, true)
	dots.push(carrier)
	infected.push(carrier)
}
