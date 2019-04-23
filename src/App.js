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

    ctx.fillStyle = "red";
    ctx.fillRect(appleX * lenghtS, appleY * lenghtS, lenghtS, lenghtS);

    ctx.fillStyle = "gray";

    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * lenghtS, trail[i].y * lenghtS,
        lenghtS - 1, lenghtS - 1);

      if (trail[i].x === pointX && trail[i].y === pointY) {
        velX = 0;
        velY = 0;
        tail = 5;
        points = 0;
        atualizarPontos(points);
      }
    }

    trail.push({ x: pointX, y: pointY });
    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX === pointX && appleY === pointY) {
      tail++;
      points++;
      atualizarPontos(points);
      appleX = Math.floor(Math.random() * quantityS);
      appleY = Math.floor(Math.random() * quantityS);
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // Left
        velX = -vel;
        velY = 0;
        break;
      case 38: // Up
        velX = 0;
        velY = -vel;
        break;
      case 39: // Right
        velX = vel;
        velY = 0;
        break;
      case 40: // Down
        velX = 0;
        velY = vel;
        break;
      default:
      //do nothing
    }
  }
}

function atualizarPontos(points) {
  document.getElementById('points_game').innerHTML = "Pontuação: " + points;
}

export default App;
