import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Point"> <p id="points_game">Pontuação: 0</p></div>
        <canvas id="stage" className="Stage" width="600px" height="600px">
        </canvas>
      </div>
    );
  }
}

window.onload = function () {
  var stage = document.getElementById('stage');
  var ctx = stage.getContext("2d");

  document.addEventListener("keydown", keyPush);
  setInterval(game, 60);

  const vel = 1;

  var velX = 0;
  var velY = 0;
  var pointX = 10;
  var pointY = 15;
  var lenghtS = 20;
  var quantityS = 30;
  var appleX = 15;
  var appleY = 15;
  var points = 0;

  var trail = [];
  var tail = 5
  var aux = 0;

  function game() {

    pointX += velX;
    pointY += velY;

    if (pointX < 0) {
      pointX = quantityS - 1;
    }
    if (pointX > quantityS - 1) {
      pointX = 0;
    }
    if (pointY < 0) {
      pointY = quantityS - 1;
    }
    if (pointY > quantityS - 1) {
      pointY = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    var img = new Image(20, 20);
    img.src = 'https://cdn-ak.f.st-hatena.com/images/fotolife/r/riboni5235/20170217/20170217105752.png';
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(appleX * lenghtS, appleY * lenghtS, lenghtS, lenghtS);

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    for (var i = 0; i < trail.length; i++) {
      ctx.arc((trail[i].x * lenghtS) + 10, (trail[i].y * lenghtS) + 10,
        lenghtS - 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      if (trail[i].x === pointX && trail[i].y === pointY) {
        deadSnake();
        updatePoints(points);
      }
    }



    trail.push({ x: pointX, y: pointY });
    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX === pointX && appleY === pointY) {
      tail++;
      points++;
      updatePoints(points);
      appleX = Math.floor(Math.random() * quantityS);
      appleY = Math.floor(Math.random() * quantityS);
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // Left
        if (aux === 37) {
          break;
        } else {
          velX = -vel;
          velY = 0;
          aux = 39;
          break;
        }
      case 38: // Up
        if (aux === 38) {
          break;
        } else {
          velX = 0;
          velY = -vel;
          aux = 40;
          break;
        }
      case 39: // Right
        if (aux === 39) {
          break;
        } else {
          velX = vel;
          velY = 0;
          aux = 37;
          break;
        }
      case 40: // Down
        if (aux === 40) {
          break;
        } else {
          velX = 0;
          velY = vel;
          aux = 38;
          break;
        }
      default:
      //do nothing
    }
  }

  function deadSnake() {
    velX = 0;
    velY = 0;
    tail = 5;
    points = 0;
    aux = 0;
  }
}

function updatePoints(points) {
  document.getElementById('points_game').innerHTML = "Pontuação: " + points;
}


export default App;
