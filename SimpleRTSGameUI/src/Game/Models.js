export class Tile {
  constructor(tile, x, y) {
    this.id = tile.id;
    this.image = tile.image;
    this.height = tile.imageheight;
    this.width = tile.imagewidth;
    this.x = x;
    this.y = y;
  }
}

export class Unit extends Tile {
  constructor(tile, x, y) {
    super(tile, x, y);
    this.health = 100;
    this.attack = 10;
    this.defense = 10;
    this.speed = 10;
    this.selected = false;
  }

}

export class Structure extends Tile {
  constructor(tile, x, y) {
    super(tile, x, y);
    this.health = 1000;
    this.defense = 10;
  }
}

export class Army {
  constructor() {
    this.units = []
    this.precision = 10 // 0 exact, 32 within tile
  }
  addUnit(unit) {
    this.units.push(unit);
  }
  onClick(x, y) {
    this.units.forEach((unit, i) => {
      if (this.withinX(unit, x) && this.withinY(unit, y)) {
        unit.selected = true;
        console.log(unit, x, y);
      }
      else {
        unit.selected = false;
      }
    });
  }
  onRightClick(x, y) {
    this.units.forEach((unit, i) => {
      if (unit.selected) {
        console.log(unit, "moving to", x, y);
      }
    });
  }
  withinX(unit, x) {
    let center = (unit.x + unit.width / 2);
    return (Math.abs(center - x) <= this.precision)
  }
  withinY(unit, y) {
    let center = (unit.y + unit.height / 2);
    return (Math.abs(center - y) <= this.precision)
  }
}
