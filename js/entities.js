"use strict";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function Lighthouse(x, y) {
  this.x = x;
  this.y = y;
  this.beamAngle = 0;
  this.beamSpeed = 0.018;
}

Lighthouse.prototype.update = function () {
  this.beamAngle += this.beamSpeed;
};

Lighthouse.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);

  ctx.fillStyle = "#1c2738";
  ctx.fillRect(-18, -120, 36, 120);
  ctx.fillStyle = "#d9dde8";
  for (var i = 0; i < 5; i++) {
    ctx.fillRect(-18, -110 + i * 22, 36, 10);
  }

  ctx.fillStyle = "#f0c36a";
  ctx.beginPath();
  ctx.moveTo(-24, -120);
  ctx.lineTo(0, -148);
  ctx.lineTo(24, -120);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.translate(0, -108);
  ctx.rotate(this.beamAngle);
  var gradient = ctx.createRadialGradient(0, 0, 8, 80, 0, 220);
  gradient.addColorStop(0, "rgba(255, 236, 160, 0.55)");
  gradient.addColorStop(1, "rgba(255, 236, 160, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(220, -36);
  ctx.lineTo(220, 36);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffe7a0";
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
};

