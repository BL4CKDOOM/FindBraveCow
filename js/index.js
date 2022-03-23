let startFlg = false;
let braveCowAudio;
let braveCowBella;
let $bellaImg1A;
let $bellaImgA;
let $bellaImg1B;
let $bellaImgB;
let voice = 0.5;
let maxWidth;
let maxHeight;
let bellaLeft;
let bellaTop;
let findBellaCount = 0;
let mouseX;
let mouseY;


$(document).ready(function () {
  maxWidth = window.innerWidth;
  maxHeight = window.innerHeight;
  $bellaImg1A = $("#bellaImg1A");
  $bellaImgA = $("#bellaImgA");
  $bellaImg1B = $("#bellaImg1B");
  $bellaImgB = $("#bellaImgB");
  setInterval("bellaImgClock()", 500);
  setInterval("calDis()", 500);
  initBraveCowAudio();
  $("#startBtn").click(function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    $("#into").hide();
    startFlg = true;
    resetBellaImg();
    voice = 1;
    braveCowAudio.play();
  });
  $("#restartBtn").click(function () {
    $("#bellaImg2").hide();
    $("#success").hide();
    startFlg = true;
    resetBellaImg();
    calDis();
    braveCowAudio.play();
  });

  document.onmousemove = mouseMove;
  function mouseMove(ev) {
    ev = ev || window.event;
    let mousePos = mouseCoords(ev);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  }

  function mouseCoords(ev) {
    if (ev.pageX || ev.pageY) {
      return {x: ev.pageX, y: ev.pageY};
    }
    return {
      x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
  }

  $(document).click(function (e) {
    if (startFlg) {
      let x = e.clientX;
      let y = e.clientY;
      let dis = (x - bellaLeft) * (x - bellaLeft) + (y - bellaTop) * (y - bellaTop);
      if (dis < (75 * 75)) {
        startFlg = false;
        braveCowBella.currentTime = 0;
        braveCowBella.play();
        findBellaCount++;
        $("#findBellaCount").html(findBellaCount);
        $("#success").show();
        $("#bellaImg2").show();
      }
    }
  });
  $("#bellaImg2").click(function () {
    braveCowBella.currentTime = 0;
    braveCowBella.play();
  });
});

function calDis() {
  if (startFlg) {
    let x = mouseX;
    let y = mouseY;
    let dis = Math.sqrt((x - bellaLeft) * (x - bellaLeft) + (y - bellaTop) * (y - bellaTop));
    let disScore = (dis * 2 / maxWidth);
    voice = 1 - (dis * 2 / maxWidth);
    console.log(voice);
  }
}

function resetBellaImg() {
  bellaLeft = Math.random() * maxWidth;
  bellaTop = Math.random() * (maxHeight - 20) + 20;
  $("#bellaImg2").css("top", bellaTop - 75).css("left", bellaLeft - 75);
}


function initBraveCowAudio() {
  braveCowAudio = $('#braveCowAudio')[0];
  braveCowBella = $('#braveCowAudio2')[0];
  braveCowAudio.addEventListener('ended', playBraveCowAudio, false);
}

// 牛乐器
function playBraveCowAudio() {
  if (startFlg) {
    braveCowAudio.currentTime = 0;
    braveCowAudio.play();
    braveCowAudio.volume = voice;
  }
}

function bellaImgClock() {
  $bellaImgA.toggle();
  $bellaImg1A.toggle();
  $bellaImgB.toggle();
  $bellaImg1B.toggle();
}