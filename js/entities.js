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

function SmokePuff(x, y) {
  this.x = x;
  this.y = y;
  this.life = 1;
  this.size = 4 + Math.random() * 4;
  this.vx = (Math.random() - 0.5) * 0.4;
  this.vy = -0.6 - Math.random() * 0.5;
}

SmokePuff.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.life -= 0.012;
  this.size += 0.08;
};

SmokePuff.prototype.draw = function (ctx) {
  ctx.save();
  ctx.globalAlpha = clamp(this.life, 0, 1) * 0.55;
  ctx.fillStyle = "#cfd8e8";
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

function Tugboat(x, y) {
  this.x = x;
  this.y = y;
  this.heading = 0;
  this.wheelAngle = 0;
  this.flagPhase = 0;
  this.smoke = [];
  this.smokeTimer = 0;
  this.pathT = 0;
}

Tugboat.prototype.update = function (width, height) {
  this.pathT += 0.0045;
  var margin = 90;
  var travel = width - margin * 2;
  var cycle = ((this.pathT % 2) + 2) % 2;
  if (cycle < 1) {
    this.x = margin + cycle * travel;
    this.heading = 0;
  } else {
    this.x = margin + (2 - cycle) * travel;
    this.heading = Math.PI;
  }
  this.y = height * 0.68 + Math.sin(this.pathT * 2.2) * 8;
  this.wheelAngle += 0.22;
  this.flagPhase += 0.12;

  this.smokeTimer -= 1;
  if (this.smokeTimer <= 0) {
    this.smoke.push(new SmokePuff(0, -48));
    this.smokeTimer = 8;
  }
  for (var i = this.smoke.length - 1; i >= 0; i--) {
    this.smoke[i].update();
    if (this.smoke[i].life <= 0) {
      this.smoke.splice(i, 1);
    }
  }
};

Tugboat.prototype.drawWheel = function (ctx, offsetX) {
  ctx.save();
  ctx.translate(offsetX, 10);
  ctx.rotate(this.wheelAngle);
  ctx.fillStyle = "#1a2230";
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#8fa0bd";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(14, 0);
  ctx.moveTo(0, -14);
  ctx.lineTo(0, 14);
  ctx.stroke();
  ctx.restore();
};

Tugboat.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(this.heading === 0 ? 1 : -1, 1);

  ctx.fillStyle = "#c45b28";
  ctx.beginPath();
  ctx.moveTo(-70, 0);
  ctx.lineTo(70, 0);
  ctx.lineTo(58, 28);
  ctx.lineTo(-50, 28);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f2d7a4";
  ctx.fillRect(-20, -28, 48, 28);
  ctx.fillStyle = "#2d3a4f";
  ctx.fillRect(-8, -42, 18, 16);

  ctx.fillStyle = "#4b5568";
  ctx.fillRect(18, -52, 14, 24);

  for (var i = 0; i < this.smoke.length; i++) {
    this.smoke[i].draw(ctx);
  }

  this.drawWheel(ctx, -34);
  this.drawWheel(ctx, 34);

  ctx.save();
  ctx.translate(-8, -54);
  ctx.strokeStyle = "#d7dde8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -34);
  ctx.stroke();
  ctx.translate(0, -34);
  ctx.fillStyle = "#e85d4c";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(18 + Math.sin(this.flagPhase) * 6, 8, 28, 4 + Math.sin(this.flagPhase * 1.4) * 3);
  ctx.quadraticCurveTo(16, 16, 0, 12);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.restore();
};

function drawBackground(ctx, width, height, time) {
  var sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#08111f");
  sky.addColorStop(0.55, "#13233a");
  sky.addColorStop(1, "#1b3a4a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#f6f0c8";
  for (var i = 0; i < 60; i++) {
    var sx = (i * 97) % width;
    var sy = (i * 53) % (height * 0.45);
    ctx.globalAlpha = 0.35 + ((i * 17) % 50) / 100;
    ctx.beginPath();
    ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#163042";
  ctx.beginPath();
  ctx.moveTo(0, height * 0.58);
  ctx.quadraticCurveTo(width * 0.25, height * 0.52, width * 0.5, height * 0.58);
  ctx.quadraticCurveTo(width * 0.75, height * 0.64, width, height * 0.56);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  var waterTop = height * 0.62;
  var water = ctx.createLinearGradient(0, waterTop, 0, height);
  water.addColorStop(0, "#1d4d63");
  water.addColorStop(1, "#0d2432");
  ctx.fillStyle = water;
  ctx.fillRect(0, waterTop, width, height - waterTop);

  ctx.strokeStyle = "rgba(180, 220, 240, 0.18)";
  ctx.lineWidth = 2;
  for (var w = 0; w < 8; w++) {
    var y = waterTop + 18 + w * 18;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (var x = 0; x <= width; x += 24) {
      ctx.lineTo(x, y + Math.sin(time * 0.004 + x * 0.03 + w) * 3);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "#3a2f24";
  ctx.fillRect(0, height * 0.58, 140, 18);
  for (var p = 0; p < 5; p++) {
    ctx.fillRect(12 + p * 26, height * 0.58, 8, 48);
  }
}
