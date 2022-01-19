let options = ['Avacyn', 'Avavyn'];
let showRoulette = document.querySelector('#showRoulette');
let rouletteContainer = document.querySelector('#roulette-container');
let drawOptions = document.querySelector('#optionsDraw');

let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;

let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

let ctx;

const reDraw = () => {
  options = drawOptions.value.split('\n');
  arc = Math.PI / (options.length / 2);
  drawRouletteWheel();
};

const toggleRoulette = () => {
    if(window.getComputedStyle(rouletteContainer).display === "none"){
      showRoulette.firstElementChild.textContent = 'Ocultar Ruleta ↑';
      rouletteContainer.style.display = 'flex';
    }else {
      showRoulette.firstElementChild.textContent = 'Mostrar Ruleta ↓';
      rouletteContainer.style.display = 'none';
    }
};

showRoulette.addEventListener('click',toggleRoulette);

drawOptions.addEventListener('input',reDraw)

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  let nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  let phase = 0;
  let center = 128;
  let width = 127;
  let frequency = Math.PI*2/maxitem;
  
  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;
  
  return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
  let canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    let outsideRadius = 400;
    let textRadius = 320;
    let insideRadius = 160;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    // ctx.lineWidth = 2;

    ctx.font = 'bold 25px sans-serif, serif';

    for(let i = 0; i < options.length; i++) {
      let angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(500, 500, outsideRadius, angle, angle + arc, false);
      ctx.arc(500, 500, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      
      ctx.fillStyle = "#fff";
      ctx.translate(500 + Math.cos(angle + arc / 2) * textRadius, 
                    500 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      let text = options[i];
      ctx.translate(0, 20);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.strokeText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(500 - 8, 500 - (outsideRadius + 10));
    ctx.lineTo(500 + 8, 500 - (outsideRadius + 10));
    ctx.lineTo(500 + 8, 500 - (outsideRadius - 10));
    ctx.lineTo(500 + 18, 500 - (outsideRadius - 10));
    ctx.lineTo(500 + 0, 500 - (outsideRadius - 26));
    ctx.lineTo(500 - 18, 500 - (outsideRadius - 10));
    ctx.lineTo(500 - 8, 500 - (outsideRadius - 10));
    ctx.lineTo(500 - 8, 500 - (outsideRadius + 10));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  let degrees = startAngle * 180 / Math.PI + 90;
  let arcd = arc * 180 / Math.PI;
  let index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 45px sans-serif, serif';
  let text = options[index]
  ctx.fillText(text, 500 - ctx.measureText(text).width / 2, 500 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  let ts = (t/=d)*t;
  let tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();