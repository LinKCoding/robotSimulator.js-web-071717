'use strict';

class Robot {
  constructor() {
    this.bearing = "east";
    this.coordinates = [0, 0];
    this.directions = ['north', 'east', 'south', 'west'];
  }

  at(x, y) {
    this.coordinates = [x, y];
  }

  orient(direction) {
    if(this.directions.includes(direction)) {
      this.bearing = direction;
    } else {
      throw new Error("Invalid Robot Bearing");
    }
  }

  turnLeft() {
    if(this.bearing === "north") {
      this.orient("west")
    } else {
      let currentIndex = this.directions.indexOf(this.bearing);
      this.orient(this.directions[currentIndex - 1]);
    }
  }

  turnRight() {
    if(this.bearing === "west") {
      this.orient("north")
    } else {
      let currentIndex = this.directions.indexOf(this.bearing)
      this.orient(this.directions[currentIndex + 1])
    }
  }

  advance() {
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

  instructions(instructions) {
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

  evaluate(instructions) {
    instructions = this.instructions(instructions);
    instructions.forEach(instr => {
      this[instr]();
    });
  }

  place(obj) {
    this.at(obj.x, obj.y);
    this.orient(obj.direction);
  }
}
