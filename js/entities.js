"use strict";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

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
