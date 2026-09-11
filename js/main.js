"use strict";

(function () {
  var canvas = document.getElementById("scene");
  var ctx = canvas.getContext("2d");

  var lighthouse = new Lighthouse(120, canvas.height * 0.58);
  var crane = new HarborCrane(780, canvas.height * 0.58);
  var boat = new Tugboat(160, canvas.height * 0.7);
  var start = performance.now();

  function update() {
    lighthouse.update();
    crane.update();
    boat.update(canvas.width, canvas.height);
  }

  function draw() {
    var time = performance.now() - start;
    drawBackground(ctx, canvas.width, canvas.height, time);
    lighthouse.draw(ctx);
    crane.draw(ctx);
    boat.draw(ctx);
  }

  function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
})();
