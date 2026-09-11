"use strict";

(function () {
  var canvas = document.getElementById("scene");
  var ctx = canvas.getContext("2d");
  var lighthouse = new Lighthouse(120, canvas.height * 0.58);
  var start = performance.now();

  function update() {
    lighthouse.update();
  }

  function draw() {
    var time = performance.now() - start;
    drawBackground(ctx, canvas.width, canvas.height, time);
    lighthouse.draw(ctx);
  }

  function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
})();
