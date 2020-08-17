let stringEquation = "";
let h = 0.5;
let beginningCondition = "";
let amountOfSteps = 0;

let listOfPoints = [];

let trueListOfPoints = [];

for (let i = 0; i < 100; i++) {
  const x = 0 + i*0.5;
  const y = 0.5 * Math.exp(x);
  const newPoint = { 'x': x, 'y': y };
  trueListOfPoints.push(newPoint);
}


function setup() {
  let canvasHolder = document.querySelector('#canvas-holder')
  let canvasWidth = canvasHolder.clientWidth;
  let myCanvas = createCanvas(canvasWidth, 600);
  myCanvas.parent(canvasHolder);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  // tegner koordinatsystemet
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  let zoom = parseInt(document.querySelector('#zoom-range').value) / 100;
  for (let pointIndex = 1; pointIndex < listOfPoints.length; pointIndex++) {
    const myPoint = listOfPoints[pointIndex];
    const prevPoint = listOfPoints[pointIndex - 1];
    push();
    strokeWeight(5);
    point(myPoint.x * zoom, -myPoint.y * zoom);
    pop();
    line(myPoint.x * zoom, -myPoint.y * zoom, prevPoint.x * zoom, -prevPoint.y * zoom);
  }
  for (let pointIndex = 1; pointIndex < trueListOfPoints.length; pointIndex++) {
    push();
    stroke(255, 0, 0);
    const myPoint = trueListOfPoints[pointIndex];
    const prevPoint = trueListOfPoints[pointIndex - 1];
    line(myPoint.x * zoom, -myPoint.y * zoom, prevPoint.x * zoom, -prevPoint.y * zoom);
    pop();
  }
  textAlign(LEFT);
  text(Math.round((-width / 2) / zoom), -width / 2 + 4, -4);
  text(Math.round((height / 2) / zoom), 4, -height / 2 + 14);
  textAlign(RIGHT);
  text(Math.round((width / 2) / zoom), width / 2 - 4, -4);
  text(Math.round((-height / 2) / zoom), -4, height / 2 - 4);
}

function getValuesFromTextfields() {
  console.clear();
  console.log('Hejsa, du har trykket på en knap 🥳');
  stringEquation = document.querySelector('#string-equation').value;
  h = parseFloat(document.querySelector('#h-text').value);
  beginningCondition = document.querySelector('#beg-con').value;
  amountOfSteps = parseInt(document.querySelector('#amount-of-steps').value) + 1;
}

function calculatePointsWithEulersMethode() {
  document.querySelector('#zoom-range').value = 100;
  getValuesFromTextfields();

  let bCS = beginningCondition.split(';');
  let firstPoint = { 'x': parseFloat(bCS[0]), 'y': parseFloat(bCS[1]) };
  listOfPoints = [firstPoint];

  for (let n = 1; n < amountOfSteps; n++) {
    let x = firstPoint.x + n * h;
    let yn = listOfPoints[n - 1].y;
    let y = yn + h * eval(stringEquation);
    let myPoint = { 'x': x, 'y': y };
    listOfPoints.push(myPoint);

    console.log(`x${n} = ${x}; y${n} = ${y}`);

  }

}

function windowResized() {
  location.reload()
}
