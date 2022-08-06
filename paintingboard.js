const canvas = document.querySelector('canvas');
const modeBtn = document.getElementById('mode-btn');
const resetBtn = document.getElementById('reset-btn');
const eraserBtn = document.getElementById('eraser-btn');
const lineWidth = document.getElementById('line-width');
const lineColor = document.getElementById('line-color');
const colorOption = Array.from(document.getElementsByClassName('color-option')); // 배열로 변경
const loadImg = document.getElementById('load-img');
const textInput = document.getElementById('text-input');
const downloadBtn = document.getElementById('download-btn');

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
  isPainting = true;
}

function onMouseleave(event) {
  isPainting = false;
  ctx.beginPath();
}

function changeRangeValue(event) {
  ctx.lineWidth = event.target.value; // input Range 값
}

function changeColor(event) {
  ctx.strokeStyle = event.target.value; // 선 색상
  ctx.fillStyle = event.target.value; // 채우기 색상
}

function onColorOption(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  lineColor.value = colorValue; // 색상선택 박스 색 변경
}

function onModeBtn(event) {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    ctx.beginPath();
    modeBtn.innerText = 'Draw';
  }
}

function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onResetBtn() {
  //ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserBtn() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Fill';
}

function onLoadImg(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== '') {
    ctx.save(); // 선언된 속성 저장
    ctx.lineWidth = 1;
    ctx.font = '68px serif';
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore(); // save() 된 거 불러 오기
  }
}

function onSaveImg(event) {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}

lineWidth.addEventListener('change', changeRangeValue);
lineColor.addEventListener('change', changeColor);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseleave);
canvas.addEventListener('mouseleave', onMouseleave);
canvas.addEventListener('dblclick', onDoubleClick);

colorOption.forEach((color) => color.addEventListener('click', onColorOption));

eraserBtn.addEventListener('click', onEraserBtn);
modeBtn.addEventListener('click', onModeBtn);
resetBtn.addEventListener('click', onResetBtn);
loadImg.addEventListener('change', onLoadImg);
downloadBtn.addEventListener('click', onSaveImg);
