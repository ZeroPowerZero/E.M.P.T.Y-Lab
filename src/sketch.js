class pObject {
  constructor(p, x, y) {
    this.id = Math.random().toString().slice(2);
    this.p = p;
    this.position = p.createVector(x, y);
  }
}
class pRect extends pObject {
  constructor(p, x, y, w, h) {
    super(p, x, y);
    this.w = w;
    this.h = h;
    this.staticObj = staticObj;
  }
  right() {
    return this.position.x + this.w;
  }
  left() {
    return this.position.x;
  }
  top() {
    return this.position.y;
  }
  bottom() {
    return this.position.y + this.h;
  }
}

class TestTube extends pRect {
  width = 50;
  height = 500;
  waterLevel = 0;
  constructor(p, x = 0, y = 0) {
    super(p, x, y, this.width, this.height);
    this.x = x;
    this.y = y;
  }
  draw(p) {
    p.fill(10, 0, 10, 25);
    p.stroke(2);
    p.strokeWeight(4);
    p.rect(this.x, this.y, this.width, this.height, 0, 0, 40, 40);
    p.stroke(255);
    // water lever
    p.rect(
      this.x,
      this.y + this.height - this.waterLevel,
      50,
      this.waterLevel,
      0,
      0,
      40,
      40
    );
    p.line(this.x, this.y, this.x + this.width, this.y);
  }
}
const collision_engine = {
  rect_rect(pRect1, pRect2) {
    if (
      pRect2.right() < pRect1.left() ||
      pRect1.right() < pRect2.left() ||
      pRect2.bottom() < pRect1.top() ||
      pRect1.bottom() < pRect2.top()
    ) {
      return false;
    }
    return true;
  },
};
const sketch = (p) => {
  let canvas;
  let testTubes = [];
  let selected_test_tube = null;
  p.setup = () => {
    canvas = p.select("#canvas");
    p.createCanvas(canvas.width, canvas.height);
    p.background(255);
    let t = new TestTube(p, 10, 50);
    let t1 = new TestTube(p, 100, 50);
    let t2 = new TestTube(p, 200, 50);
    testTubes.push(t);
    testTubes.push(t1);
    testTubes.push(t2);
  };
  p.windowResized = () => {
    canvas = p.select("#canvas");
    p.resizeCanvas(canvas.width, canvas.height);
  };
  p.draw = () => {
    p.background(255);
    for (let i = 0; i < testTubes.length; i++) {
      testTubes[i].draw(p);
    }
  };
  p.mousePressed = () => {
    let x = p.mouseX;
    let y = p.mouseY;

    let mouse = new pRect(x, y);
    for (let i = 0; i < testTubes.length; i++) {
      if (collision_engine.rect_rect(testTubes[i], mouse)) {
        selected_test_tube = testTubes[i];
        break;
      }
    }
    console.log(selected_test_tube);
  };
  p.mouseDragged = () => {
    selected_test_tube.x = p.mouseX;
    selected_test_tube.y = p.mouseY;
  };
};

export default sketch;
