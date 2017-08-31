'use strict';

function Robot() {
  this.bearing = "east";
  this.coordinates = [0, 0];
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y];
}

Robot.prototype.directions = ['north', 'east', 'south', 'west'];

Robot.prototype.orient = function(direction) {
  if(this.directions.includes(direction)) {
    this.bearing = direction;
  } else {
    throw new Error("Invalid Robot Bearing");
  }
}

Robot.prototype.turnLeft = function() {
  if(this.bearing === "north") {
    this.orient("west")
  } else {
    let currentIndex = this.directions.indexOf(this.bearing);
    this.orient(this.directions[currentIndex - 1]);
  }
}

Robot.prototype.turnRight = function() {
  if(this.bearing === "west") {
    this.orient("north")
  } else {
    let currentIndex = this.directions.indexOf(this.bearing)
    this.orient(this.directions[currentIndex + 1])
  }
}

Robot.prototype.advance = function() {
  let c = this.coordinates
  switch(this.bearing) {
    case "north":
      this.at(c[0], c[1] + 1);
    break;
    case "south":
      this.at(c[0], c[1] - 1);
    break;
    case "east":
      this.at(c[0] + 1, c[1]);
    break;
    case "west":
      this.at(c[0] - 1, c[1]);
    break;
  }
}

Robot.prototype.instructions = function(instructions) {
  instructions = instructions.split("");
  let finalInstructions = instructions.map((inst) => {
    switch (inst) {
      case "L":
        return "turnLeft";
      break;
      case "R":
        return "turnRight";
      break;
      case "A":
        return "advance";
      break;
    }
  });

  return finalInstructions;
}

Robot.prototype.evaluate = function(instructions) {
  instructions = this.instructions(instructions);
  instructions.forEach(instr => {
    this[instr]();
  });
}

Robot.prototype.place = function(obj) {
  this.at(obj.x, obj.y);
  this.orient(obj.direction);
}
