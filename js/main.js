"use strict";

(function () {
  var canvas = document.getElementById("scene");
  var ctx = canvas.getContext("2d");
  var start = performance.now();

  function update() {
  }

  function draw() {
    var time = performance.now() - start;
    drawBackground(ctx, canvas.width, canvas.height, time);
  }

  function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
})();
