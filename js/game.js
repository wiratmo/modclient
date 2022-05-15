const idinst = document.querySelector('#instruction');
let canvas;
let ctx;
let countPress = 0;
let score = [];
let sco = 0;
let speed = 2;
let scoreSpan;
let ccc = 0;
let intvl = 4;
let count=Math.floor(Math.random()*intvl*100)+10;
var cm;
var ctxm;
let timer = [
null, null, null, null
];
let col = [
{
  d: [
  0, 1
  ],
  c: 0
},
]
window.onkeydown = function (e) {
  switch (e.keyCode) {
    case 68:
    countPress++;
    drawClick(0);
    break;
    case 70:
    countPress++;
    drawClick(1);
    break;
    case 74:
    countPress++;
    drawClick(2);
    break;
    case 75:
    countPress++;
    drawClick(3);
    break;
  }
}


getPlay()

function getPlay(){
  var gtPlay = setInterval(function(){
    if(idinst.classList.contains('isVisible')){
      
      getPause()
      clearInterval(gtPlay)
    }
  })
}

function getPause(){
  setTimeout(function(){
    window.onload = init();
    setInterval(function () {
    var d = new Date();
    var seconds = d.getMinutes() * 60 + d.getSeconds(); //convet 00:00 to seconds for easier caculation
    var fiveMin = 60 * 5; //five minutes is 300 seconds!
    var timeleft = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
    var result = parseInt(timeleft / 60) + ':' + timeleft % 60; //formart seconds into 00:00 
    timePan.innerText = result;

    }, 1000) //calling it every 0.5 second to do a count down
  }, 3000)

}

function init(){
  scorePan = document.querySelector('.score div')
  timePan = document.querySelector('.time div')
  canvas = document.getElementById('cvs-a');
  cm = document.getElementById('cvs-b');
  ctxm = cm.getContext('2d');
  ctx = canvas.getContext('2d');
  ctx.fillStyle = "#3e8db1";
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0;
  ctxm.fillStyle = "#000000";
  ctxm.strokeStyle = '#66CFFF';
  ctxm.lineWidth = 5;
  baseMap();
  giveScore();
  setInterval(() => {
    baseMap();
    drawDot();
    ccc++;
    if (ccc > count) {
      col.push({
        d: giveDot(),
        c: 0
      });
      ccc = 0;
    }
  }, 10);
}

function drawClick(i) {
  ctxm.beginPath();
  ctxm.rect(i * 150 + 0, 0, 150, 60);
  ctxm.stroke();
  for (let z = 0; z < col.length; z++) {
    if (col[z].c > 900) {
      for (let x = 0; x < col[z].d.length; x++) {
        if (col[z].d[x] === i) {
          col[z].d.splice(x, 1);
          if (col[z].d.length < 1) {
            col.splice(z, 1);
          }
        }
      }
      sco++;
      var hsl = (sco/countPress)*100
      scorePan.innerText =  hsl.toFixed(3)+ '%';
    }
  }
  if (timer[i] !== null) {
    clearTimeout(timer[i]);
  }
  timer[i] = setTimeout(() => {
    ctxm.clearRect(i * 150 + 0, 0, 150, 60);
  }, 10);

}
function drawDot() {
  for (let i = 0; i < col.length; i++) {
    for (let j = 0; j < col[i].d.length; j++) {
      ctx.beginPath();
      ctx.rect(col[i].d[j] * 150 + 0, col[i].c, 150, 60);
      ctx.fill();
    }
    col[i].c += speed;
    if (col[i].c > 960) {
      delDot(i);
    }
  }
}

function delDot(i) {
  col.splice(i, 1);
}

/*buat apa*/
function giveScore() {
  for (let i = 0; i < 100; i++) {
    score.push({
      d: giveDot(),
      c: 0
    });
  }
}

 function giveDot() {
    let k = Math.floor(Math.random() * 4);
    return [k];
}

function baseMap() {
  ctx.clearRect(0, 0, canvas.width, 960);
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(0 + i * 150, 0);
    ctx.lineTo(0 + i * 150, 960);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(0 , 960);
  ctx.lineTo(600  , 960);
  ctx.stroke();
}