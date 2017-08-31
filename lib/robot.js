'use strict';

function Robot() {
  return {
    bearing: "east",
    coordinates: [],
    at: function(x, y) {
      this.coordinates = [x, y]
    },
    turnRight: function() {
      if(this.bearing === "west") {
        this.orient("north")
      } else {
        let currentIndex = this.directions.indexOf(this.bearing)
        this.orient(this.directions[currentIndex + 1])
      }
    },
    turnLeft: function() {
      if(this.bearing === "north") {
        this.orient("west")
      } else {
        let currentIndex = this.directions.indexOf(this.bearing);
        this.orient(this.directions[currentIndex - 1]);
      }
    },
    advance: function() {
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
    },
    instructions: function(instructions) {
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
    },
    evaluate: function(instructions) {
      instructions = this.instructions(instructions);
      instructions.forEach(instr => {
        this[instr]();
      });
    },
    place: function(obj) {
      this.at(obj.x, obj.y);
      this.orient(obj.direction);
    },
    directions: ['north', 'east', 'south', 'west'],
    orient: function(direction) {
      if(this.directions.includes(direction)) {
        this.bearing = direction;
      } else {
        throw new Error("Invalid Robot Bearing");
      }
    }
  }
}
